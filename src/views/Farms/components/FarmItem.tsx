import React, { useEffect, useMemo, useState } from 'react';
import { useCallback } from 'react';
import { FarmPoolData, PartnerFarmPoolData } from 'src/api/backend-api';
import Loading from 'src/components/Loading';
import TokenSymbol from 'src/components/TokenSymbol';
import { PoolConfig } from 'src/iron-bank/config';
import theme from 'src/theme';
import { numberWithCommas, styledNumber } from 'src/utils/formatBN';
import styled from 'styled-components';
import TokenSymbolMini from '../../../components/TokenSymbol/TokenSymbolMini';
import { useBlockNumber } from 'src/state/application/hooks';
import { formatSecs } from 'src/utils/formatTime';
import StakeLPComponent from './StakeLPComponent';
import UnstakeLPComponent from './UnstakeLPComponent';
import Spacer from 'src/components/Spacer';
import { BigNumber } from '@ethersproject/bignumber';
import { AddNotification, fromBigNum, toBigNum } from 'src/utils';
import { useBlockchainContext } from 'src/contexts/blockchainProvider';
import { ethers } from 'ethers';

export type FarmItemProps = {
  index: number;
  poolConfig: PoolConfig;
  expanded: boolean;
  toggle: (index: number) => void;
  data: FarmPoolData | PartnerFarmPoolData;
  visible: boolean;
  onlyDeposit?: boolean;
  updatePoolDeposit?: (index: number, deposit: boolean) => void;
};

type FarmItemStatus = {
  balance: any;
  deposited: any;
  allowance: BigNumber;
  tvl: number | null;
  apr: number | null;
  apy: number | null;
  share: number;
  pendingReward: number;
  isLoaded?: boolean;
  wantTokenPrice?: number;
};

const FarmItem: React.FC<FarmItemProps> = ({
  index,
  visible,
  poolConfig,
  expanded,
  toggle,
  updatePoolDeposit,
  data,
  onlyDeposit,
}) => {
  const {
    id,
    token0,
    token1,
    profitSharing,
    isLp,
    rewardToken,
    wantDecimals,
    addLiquidityUrl,
    removeLiquidityUrl,
    buyUrl,
    masterChefAddress,
    coming,
    inactive,
    market,
    marketSymbol,
    farmUrl,
    wantToken,
  } = poolConfig;

  const blockNumber = useBlockNumber();
  const startFarmingBlock = 15285556;
  const eta = useMemo(() => {
    if (!blockNumber) return;
    const now = Date.now();
    const delta = startFarmingBlock - blockNumber;
    if (delta < 0) {
      return;
    }
    return Math.floor(now / 1000 + delta * 2.1);
  }, [blockNumber, startFarmingBlock]);

  const expandRow = useCallback(() => {
    if (farmUrl) {
      window.open(farmUrl, '_blank');
      return;
    }
    if (!expanded) {
      toggle(index);
    }
  }, [farmUrl, expanded, toggle, index]);

  const toggleRow = useCallback(
    ($event) => {
      if (farmUrl) return;
      toggle(index);
      $event.preventDefault();
      $event.stopPropagation();
    },
    [farmUrl, toggle, index],
  );

  const rewardPerDay = useMemo(() => {
    if (!data?.rewardPerBlock) {
      return;
    }
    const numberOfBlockPerDay = (3600 * 24) / 2;
    return numberWithCommas((parseFloat(data.rewardPerBlock) * numberOfBlockPerDay).toFixed(0));
  }, [data]);

  // new states
  const [
    state,
    {
      dispatch,
      checkPoolStatus,
      checkUserStatus,
      checkLPPrice,
      approveERC20,
      deposit,
      withdraw,
    },
  ] = useBlockchainContext();

  const [status, setStatus] = useState<FarmItemStatus>({
    balance: null,
    deposited: null,
    allowance: null,
    tvl: null,
    apr: null,
    apy: null,
    share: 0,
    pendingReward: 0,
    isLoaded: false,
    wantTokenPrice: 0,
  });

  const isShow = useMemo(() => {
    if (visible && !onlyDeposit) return true;
    if (visible && onlyDeposit && status.share > 0) return true;
    return false;
  }, [visible, onlyDeposit, status.share]);

  useEffect(() => {
    updatePoolDeposit && updatePoolDeposit(index, isShow);
  }, [isShow, onlyDeposit, index, updatePoolDeposit]);

  // price api
  const getPrice = async (wantToken: string, isLpToken = false) => {
    if (isLpToken) {
      try {
        const prices = {
          [token0]: 1,
          [token1]: 2,
        };
        return await checkLPPrice(wantToken, prices);
      } catch (err: any) {
        console.log('Farms/FarmItem', err.message);
        return 1;
      }
    }
    return 1;
  };

  // pool status updator
  const updatePoolStatus = async () => {
    try {
      const { poolBalance, poolInfo, totalAllocPoint, lithPerBlock } = await checkPoolStatus(
        masterChefAddress,
        id,
        wantToken,
      );
      console.log('updatePoolStatus', id, isLp);
      const wantTokenPrice = await getPrice(wantToken, isLp);
      const rewardTokenPrice = await getPrice(rewardToken);

      const tvl = wantTokenPrice * fromBigNum(poolBalance);
      const rewardPerYear = lithPerBlock
        .mul(poolInfo.allocPoint)
        .mul(toBigNum((365 * 24 * 3600) / 15, 0))
        .div(totalAllocPoint);

      const apr =
        Number(poolBalance) == 0
          ? 0
          : (fromBigNum(rewardPerYear) * rewardTokenPrice) /
            (fromBigNum(poolBalance) * wantTokenPrice);

      const numberOfCompoundingPerYear = 365; // daily compound
      const apy =
        Math.pow(1 + apr / numberOfCompoundingPerYear, numberOfCompoundingPerYear) - 1;

      setStatus({
        ...status,
        tvl: tvl,
        apr: apr * 100,
        apy: apy * 100,
        wantTokenPrice: Number(wantTokenPrice),
      });

      // save tvl to global state
      dispatch({
        type: 'tvls',
        payload: {
          [id]: tvl,
        },
      });
    } catch (err: any) {
      console.log('farmitem/updatePoolStatus', err.message);
    }
  };

  const updateStatus = async () => {
    if (state.signer) {
      try {
        const wantTokenPrice = await getPrice(wantToken, isLp);
        const rewardTokenPrice = await getPrice(rewardToken);

        const {
          poolBalance,
          poolInfo,
          totalAllocPoint,
          lithPerBlock,
          userBalance,
          userInfo,
          pendingReward,
          allowance,
        } = await checkUserStatus(masterChefAddress, id, wantToken);

        const tvl = wantTokenPrice * fromBigNum(poolBalance);
        const deposited = userInfo.amount;
        const share =
          Number(poolBalance) == 0
            ? 0
            : Number(deposited.mul(fromBigNum(100, 0)).div(poolBalance));

        const rewardPerYear = lithPerBlock
          .mul(poolInfo.allocPoint)
          .mul(toBigNum((365 * 24 * 3600) / 15, 0))
          .div(totalAllocPoint);

        const apr =
          Number(poolBalance) == 0
            ? 0
            : (fromBigNum(rewardPerYear) * rewardTokenPrice) /
              (fromBigNum(poolBalance) * wantTokenPrice);

        const numberOfCompoundingPerYear = 365; // daily compound
        const apy =
          Math.pow(1 + apr / numberOfCompoundingPerYear, numberOfCompoundingPerYear) - 1;

        setStatus({
          ...status,
          balance: userBalance,
          deposited: deposited,
          allowance: allowance,
          tvl: tvl,
          share: share,
          pendingReward: fromBigNum(pendingReward),
          apr: apr * 100,
          apy: apy * 100,
          isLoaded: true,
          wantTokenPrice: Number(wantTokenPrice),
        });
        // save tvl to global state
        dispatch({
          type: 'tvls',
          payload: {
            [id]: tvl,
          },
        });
      } catch (err: any) {
        console.log('farms/farmItem/updateStatus', err);
        setStatus({ ...status, balance: toBigNum(0) });
      }
    } else {
      updatePoolStatus();
    }
  };

  /* ----------- user action ----------- */
  const setDeposit = async (amount: BigNumber) => {
    try {
      if (!status.isLoaded) throw new Error('state not loaded yet');

      if (amount.gt(status.allowance)) {
        const tx = await approveERC20(
          wantToken,
          masterChefAddress,
          ethers.constants.MaxUint256,
        );
        await tx.wait();
      }
      const tx = await deposit(masterChefAddress, id, amount);
      await tx.wait();
      AddNotification('success', 'Deposit success', 'success');
      updateStatus();
    } catch (err: any) {
      console.log('farmitem/setDeposit', err.message);
    }
  };
  const setWithdraw = async (amount: BigNumber) => {
    try {
      const tx = await withdraw(masterChefAddress, id, amount);
      await tx.wait();
      AddNotification('success', 'withdraw success', 'success');
      updateStatus();
    } catch (err: any) {
      console.log('farmitem/setWithdraw', err.message);
    }
  };

  useEffect(() => {
    updateStatus();
  }, [state.signer]);

  return (
    isShow && (
      <StyledContainer
        isSticky={coming && profitSharing && !isLp}
        isExpand={expanded}
        onClick={expandRow}
      >
        <StyledHeader>
          <StyledHeaderCell>
            <StyledHeaderIcon>
              <StyledHeaderIconWrapper marginRight={token1 ? '-10px' : ''}>
                <TokenSymbolMini symbol={token0} />
              </StyledHeaderIconWrapper>
              {token1 && (
                <StyledHeaderIconWrapper>
                  <TokenSymbolMini symbol={token1} />
                </StyledHeaderIconWrapper>
              )}
            </StyledHeaderIcon>
            <StyledHeaderStatus>
              <StyledHeaderTitle>
                {token0}
                {token1 ? '/' + token1 : ''}
              </StyledHeaderTitle>
              <StyledHeaderSubTitle>
                {market && (
                  <div className="logo">
                    <TokenSymbol symbol={marketSymbol} size={22} />
                  </div>
                )}
                {!market ? `Earn ${rewardToken}` : market}
              </StyledHeaderSubTitle>
            </StyledHeaderStatus>
          </StyledHeaderCell>
          <StyledHeaderCell paddingLeft={3}>
            <StyledHeaderIconWrapper>
              <TokenSymbolMini symbol={rewardToken} />
            </StyledHeaderIconWrapper>
            <StyledHeaderStatus>
              <StyledHeaderTitle>{rewardToken}</StyledHeaderTitle>
              <StyledHeaderSubTitle>
                {rewardPerDay && (
                  <>
                    {rewardPerDay} {rewardToken} per day
                  </>
                )}
              </StyledHeaderSubTitle>
            </StyledHeaderStatus>
          </StyledHeaderCell>
          <StyledHeaderCell paddingLeft={10} hiddenXs={true}>
            <StyledHeaderDataValue highlight={true}>
              {status.deposited
                ? '$' +
                  numberWithCommas(
                    styledNumber(fromBigNum(status.deposited) * status.wantTokenPrice),
                  )
                : '$0'}
            </StyledHeaderDataValue>
          </StyledHeaderCell>
          <StyledHeaderCell paddingLeft={14} hiddenXs={true}>
            <StyledHeaderDataValue>
              {status.tvl ? (
                '$' + numberWithCommas(styledNumber(status.tvl))
              ) : (
                <Loading size={'16px'} color={theme.color.white} />
              )}
            </StyledHeaderDataValue>
          </StyledHeaderCell>
          <StyledHeaderCell paddingLeft={18} hiddenXs={true}>
            <StyledHeaderDataValue>
              <div className="line">
                <span className="field">APR</span>
                <div className="value">
                  {status.apr ? (
                    numberWithCommas(styledNumber(status.apr)) + '%'
                  ) : farmUrl ? (
                    '-'
                  ) : (
                    <Loading size={'16px'} color={theme.color.white} />
                  )}
                </div>
              </div>
              <div className="line">
                <span className="field">APY</span>
                <div className="value">
                  {status.apy ? (
                    numberWithCommas(styledNumber(status.apy)) + '%'
                  ) : farmUrl ? (
                    '-'
                  ) : (
                    <Loading size={'16px'} color={theme.color.white} />
                  )}
                </div>
              </div>
            </StyledHeaderDataValue>
          </StyledHeaderCell>
          <StyledHeaderCell>
            {farmUrl ? (
              <StyledLink href={farmUrl} target="_blank" rel="noopener noreferrer">
                <i className="fas fa-external-link"></i>
              </StyledLink>
            ) : (
              <StyledHeaderAction onClick={toggleRow} expanded={expanded}>
                <i className={expanded ? 'fas fa-chevron-up' : 'fas fa-chevron-down'}></i>
              </StyledHeaderAction>
            )}
          </StyledHeaderCell>
        </StyledHeader>
        <StyledSubheaderMobile>
          <StyledSubheaderCell>
            TVL:
            <StyledHeaderDataValue>
              {status.tvl ? (
                '$' + numberWithCommas(styledNumber(status.tvl))
              ) : (
                <Loading size={'16px'} color={theme.color.white} />
              )}
            </StyledHeaderDataValue>
          </StyledSubheaderCell>
          <StyledSubheaderCell>
            APR:
            <StyledHeaderDataValue>
              {status.apr ? (
                numberWithCommas(styledNumber(status.apr)) + '%'
              ) : farmUrl ? (
                '-'
              ) : (
                <Loading size={'16px'} color={theme.color.white} />
              )}
            </StyledHeaderDataValue>
          </StyledSubheaderCell>
          <StyledSubheaderCell>
            Deposited:
            <StyledHeaderDataValue highlight={true}>
              {status.deposited ? (
                '$' +
                numberWithCommas(
                  styledNumber(fromBigNum(status.deposited) * status.wantTokenPrice),
                )
              ) : (
                <Loading size={'16px'} color={theme.color.white} />
              )}
            </StyledHeaderDataValue>
          </StyledSubheaderCell>
          <StyledSubheaderCell>
            APY:
            <StyledHeaderDataValue>
              {status.apy ? (
                numberWithCommas(styledNumber(status.apy)) + '%'
              ) : farmUrl ? (
                '-'
              ) : (
                <Loading size={'16px'} color={theme.color.white} />
              )}
            </StyledHeaderDataValue>
          </StyledSubheaderCell>
        </StyledSubheaderMobile>
        {expanded && !farmUrl ? (
          <StyledContent>
            <StyledInnerContent>
              {coming && eta ? (
                <StyledCountdown>
                  Current block: <span>{blockNumber}</span>.<br />
                  Farming reward will emit from block <span>{startFarmingBlock}</span>.
                  Estimated time <span>{formatSecs(eta)}</span>.
                </StyledCountdown>
              ) : null}
              {inactive && (
                <StyleInactive>
                  This pool is currently inactive. Please unstake and withdraw your funds.
                </StyleInactive>
              )}
              <StyledControl>
                <StyledControlItem className="balance">
                  <StakeLPComponent
                    setDeposit={setDeposit}
                    poolConfig={poolConfig}
                    balance={status.balance}
                  />
                </StyledControlItem>
                <StyledControlItem className="deposited">
                  <UnstakeLPComponent
                    poolConfig={poolConfig}
                    balance={status.deposited}
                    setWithdraw={setWithdraw}
                  />
                </StyledControlItem>
              </StyledControl>
            </StyledInnerContent>
            <StyledClaimContainer>
              <div className="left">
                {isLp ? (
                  <StyledLiquidity>
                    <a href={addLiquidityUrl} target="_blank">
                      Add liquidity
                    </a>
                    <a href={removeLiquidityUrl} target="_blank">
                      Remove liquidity
                    </a>
                  </StyledLiquidity>
                ) : (
                  <StyledLiquidity>
                    <a className="single" href={buyUrl} target="_blank">
                      Buy {token0}
                    </a>
                  </StyledLiquidity>
                )}
              </div>
              <div className="right">
                <StyledTokenStaked>
                  Your Share:
                  <span className="stake-highlight">{status.share}%</span>
                </StyledTokenStaked>
                <Spacer size="lg" />
                <StylePendingRewards>
                  Rewards:
                  <span className="amount">{status.pendingReward}</span>
                  <span className="symbol">&nbsp;{rewardToken}</span>
                  <Spacer size="sm" />
                  <Button onClick={() => setDeposit(BigNumber.from(0))}>Claim</Button>
                </StylePendingRewards>
              </div>
            </StyledClaimContainer>
          </StyledContent>
        ) : null}
      </StyledContainer>
    )
  );
};

const StyledSubheaderMobile = styled.div`
  display: none;
  @media (max-width: 768px) {
    margin-top: 15px;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(2, 1fr);
    font-size: 11px;
  }
`;

const StyledSubheaderCell = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 3px;
`;

const StyledHeaderCell = styled.div<{ paddingLeft?: number; hiddenXs?: boolean }>`
  display: flex;
  align-items: center;
  padding-left: ${({ paddingLeft }) => (paddingLeft ? paddingLeft + 'px' : '')};
  @media (max-width: 768px) {
    display: ${({ hiddenXs }) => (hiddenXs ? 'none' : 'flex')};
  }
`;

const StyledControl = styled.div`
  display: flex;
  padding-bottom: 25px;
  @media (max-width: 768px) {
    flex-wrap: wrap;
    flex-direction: column;
    align-items: flex-start;
  }
`;

const StyledInnerContent = styled.div`
  padding: 0 40px;
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: 0;
  }
`;

const StyledControlItem = styled.div`
  flex: 1;
  width: 100%;
  .group-button {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 62px;
  }
  :not(:first-child) {
    margin-left: 23px;
  }
  :not(:last-child) {
    margin-right: 23px;
  }
  @media (max-width: 768px) {
    :not(:first-child) {
      margin-left: 0px;
      margin-top: 40px;
    }
    :not(:last-child) {
      margin-right: 0px;
    }
  }
`;

const StyledCountdown = styled.div`
  font-size: 14px;
  margin-bottom: 20px;
  span {
    font-weight: 400;
    color: #fea430;
  }
  @media (max-width: 768px) {
    margin-top: 20px;
  }
`;

const StyleInactive = styled.div`
  font-size: 14px;
  margin-bottom: 20px;
  font-weight: 400;
  color: #d33535;
  @media (max-width: 768px) {
    margin-top: 20px;
  }
`;

const StyledLiquidity = styled.div`
  display: flex;
  margin-left: auto;
  a {
    padding: 0px;
    margin-right: 20px;
    font-size: 14px;
    font-weight: 500;
    color: #ff9f00;
    text-decoration: none;
    :hover {
      text-decoration: underline;
    }
  }
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    margin-left: 0;
    margin-bottom: 20px;
    width: 100%;
    a {
      flex: 1;
      padding: 0;
      text-align: center;
      margin-left: 0;
    }
  }
`;
const StyledClaimContainer = styled.div`
  display: flex;
  align-items: center;
  font-size: 15px;
  font-weight: 500;
  color: #ffffff;
  border-top: 1px dashed #292441;
  padding: 10px 10px 5px;
  .left {
  }
  .right {
    margin-left: auto;
    display: flex;
    align-items: center;
  }
  .amount {
    font-weight: 500;
    color: #00dc2d;
    margin-left: 5px;
  }
  .symbol {
    font-weight: 500;
    color: #91908f;
  }
  .claim {
    margin-left: 10px;
    background: transparent;
    border: none;
    cursor: pointer;
    font-size: 15px;
    font-weight: 600;
    color: #ff9f00;
    :disabled {
      color: #91908f;
      cursor: not-allowed;
    }
    &:not(:disabled):hover {
      text-decoration: underline;
    }
  }
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    flex-direction: column;
    .left {
      display: flex;
      align-items: center;
      a {
        white-space: nowrap;
      }
    }
    .right {
      margin: auto;
      flex-direction: column;
    }
  }
`;

const StyledTokenStaked = styled.div`
  font-size: 16px;
  font-weight: 500;
  display: flex;
  align-items: center;
  a {
    font-size: 14px;
  }
  i {
    margin-left: 8px;
  }
  .stake-highlight {
    color: #00dc2d;
    margin-left: 10px;
    font-size: 14px;
  }
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    flex-direction: column-reverse;
    font-size: 14px;
    .stake-highlight {
      margin-left: 0px;
    }
  }
`;

const StyledContainer = styled.div<{ isExpand?: boolean; isSticky?: boolean }>`
  width: 100%;
  padding: 10px 10px;
  border-radius: 8px;
  background-image: linear-gradient(to right, rgb(34 59 231 / 9%), rgb(52 67 249 / 15%));
  cursor: ${({ isExpand }) => (isExpand ? 'auto' : 'pointer')};
  border: 2px solid #3292ff38;
  position: relative;
  :hover {
    border: 2px solid ${({ isExpand }) => (isExpand ? '#3292ff38' : '#3292ffc7')};
  }
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: 15px 10px;
  }
`;
const StyledContent = styled.div`
  margin-top: 15px;
  padding-top: 25px;
  border-top: 1px dashed #292441;
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    padding-top: 25px;
  }
`;

const StyledHeader = styled.div`
  display: grid;
  grid-template-columns: 5fr 5fr 3fr 4fr 3fr 1fr;
  grid-gap: 10px;
  text-decoration: none;
  flex: 1;
  > .indicator-icon {
    margin-left: auto;
    position: absolute;
    top: -14px;
    img + img {
      margin-left: 8px;
    }
  }
  .earn-info {
    display: flex;
    flex: 1;
  }
  .group-icon {
    display: flex;
  }
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: 10fr 10fr 1fr;
    .earn-info {
      flex-direction: column;
      justify-content: center;
      img {
        width: 30px !important;
        height: 30px !important;
      }
    }
  }
`;

const StyledHeaderStatus = styled.div`
  margin-left: 10px;
  flex: 1;
  white-space: no-wrap;
`;

const StyledHeaderIcon = styled.div`
  padding: 5px 0;
  display: flex;
  align-items: center;
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: 5px 0;
  }
`;

const StylePendingRewards = styled.div`
  display: flex;
  align-items: center;
`;

const StyledHeaderIconWrapper = styled.div<{ marginRight?: string }>`
  display: flex;
  align-items: center;
  margin-right: ${({ marginRight }) => marginRight || '0'};
`;

const StyledHeaderTitle = styled.div`
  font-size: 14px;
  font-weight: 500;
  color: #ffffff;
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: 13px;
  }
`;

const StyledHeaderSubTitle = styled.div`
  display: flex;
  align-items: center;
  margin-top: 3px;
  font-size: 13px;
  color: #b2b4b6;
  .logo {
    margin-right: 5px;
    height: 20px;
  }
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: 10px;
    .logo {
      margin-right: 5px;
      height: 14px;
      img {
        height: 14px !important;
        width: auto !important;
      }
    }
  }
`;

const StyledHeaderDataValue = styled.div<{ highlight?: boolean }>`
  font-size: 14px;
  font-weight: 600;
  color: ${({ highlight }) => (highlight ? '#00dc2d' : '#ffffff')};
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    margin: 0px 0px 0px 10px;
    font-size: 11px;
  }
  .line {
    display: flex;
    align-items: center;
    font-size: 12px;
    margin-bottom: 3px;
    font-weight: 500;
    .field {
      color: #a2a2a2;
      margin-right: 10px;
    }
  }
`;

const StyledHeaderAction = styled.button<{ expanded?: boolean }>`
  width: 20px;
  margin-left: 10px;
  appearance: none;
  background: transparent;
  color: ${({ theme }) => theme.color.primary.main};
  font-size: 18px;
  color: #ffffff;
  display: flex;
  align-items: center;
  cursor: pointer;
  transition: ease-in-out 100ms;
  text-decoration: none;
  border: none;
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: 14px;
    margin-left: 5px;
  }
`;

const StyledLink = styled.a`
  display: flex;
  align-items: center;
  margin-left: 20px;
  font-size: 16px;
  color: #fff;
  text-decoration: none;
  &:hover {
    color: #ff9f00;
  }
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: 14px;
    margin-left: 5px;
  }
`;

const Button = styled.button`
  text-align: center;
  border-radius: 6px;
  outline: none;
  border: 1px solid transparent;
  text-decoration: none;
  display: flex;
  justify-content: center;
  flex-wrap: nowrap;
  align-items: center;
  cursor: pointer;
  position: relative;
  z-index: 1;
  background-color: #db9119;
  color: ${({ theme }) => theme.color.white};
  font-size: 16px;
  font-weight: 600;
  transition: ease-in-out 150ms;
  padding: 10px 22px;
  &:hover {
    background-color: #ff9f00;
  }
  &:disabled {
    background-color: rgb(64, 68, 79);
    color: ${({ theme }) => theme.color.grey[400]};
    cursor: auto;
    box-shadow: none;
    border: 1px solid transparent;
    outline: none;
    opacity: 1;
  }
  .loader {
    margin-right: 5px;
    height: 20px;
  }
`;

export default FarmItem;
