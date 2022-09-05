import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useConfiguration } from 'src/contexts/ConfigProvider/ConfigProvider';
import styled from 'styled-components';
import Page from '../../components/Page';
import FarmItem from './components/FarmItem';
import Icon from '../../assets/img/icon-staking.svg';
import noFarm from '../../assets/img/no-farm.svg';
import Spacer from 'src/components/Spacer';
import { FarmData, useFetchFarmData } from 'src/api/backend-api';
import { numberWithCommas } from 'src/utils/formatBN';
import Loading from 'src/components/Loading';
import theme from 'src/theme';
import Select from 'react-select';
import { FarmingPool, PoolConfig } from 'src/iron-bank/config';
import { buyTokenLinks, createAddLiquidityLink, createRemoveLiquidityLink } from 'src/farms';
import { flatten } from 'lodash';
import Switch from 'react-switch';
import Popover from 'src/components/Popover';

type PoolDepositStatus = {
  id: number;
  deposit: boolean;
};

const Farms: React.FC = () => {
  const config = useConfiguration();
  const [expanded, setExpanded] = useState(-1);
  const [data, setData] = useState<FarmData>();
  const [farmType, setFarmType] = useState('all');
  const [farmReward, setFarmReward] = useState('all');
  const [showOnlyDeposit, setShowOnlyDeposit] = useState(false);
  const [showOnlyInactive, setShowOnlyInactive] = useState(false);
  const [poolDeposits, setPoolDeposits] = useState<PoolDepositStatus[]>([]);
  const fetchFarmData = useFetchFarmData();

  const allFarmTypes = [
    { value: 'all', label: 'All' },
    { value: 'stable', label: 'Stable' },
    { value: 'single', label: 'Single Asset' },
    { value: 'profit', label: 'Profit Sharing' },
  ];
  const allFarmRewards = [
    { value: 'all', label: 'All' },
    { value: 'lith', label: 'LITH' },
    { value: 'usdc', label: 'USDC' },
  ];

  const toggle = (index: number) => {
    if (expanded !== -1 && expanded === index) {
      setExpanded(-1);
    } else {
      setExpanded(index);
    }
  };

  useEffect(() => {
    let mounted = true;
    fetchFarmData().then((data) => {
      if (mounted) {
        setData(data);
      }
    });
    return () => {
      mounted = false;
    };
  }, [fetchFarmData]);

  const tvl = useMemo(() => {
    if (!data?.total) {
      return;
    }
    return (+data?.total).toFixed(0);
  }, [data]);

  const getPoolData = useCallback(
    (pid: number, masterChef: string) => {
      return (data?.pools || []).find((t) => t.masterChef === masterChef && t.id == pid);
    },
    [data?.pools],
  );

  const getPartnerPoolData = useCallback(
    (partnerPoolAddress: string) => {
      return (data?.partnerPools || []).find(
        (t) => t.partnerPoolAddress === partnerPoolAddress,
      );
    },
    [data?.partnerPools],
  );

  const getPoolConfig = useCallback((pool: FarmingPool, masterChef: string): PoolConfig => {
    return Object.assign(pool, {
      masterChefAddress: masterChef,
      addLiquidityUrl: createAddLiquidityLink(pool.market, pool.token0, pool.token1),
      removeLiquidityUrl: createRemoveLiquidityLink(pool.market, pool.token0, pool.token1),
      buyUrl: pool.wantSymbol ? buyTokenLinks[pool.wantSymbol] : '',
      wantDecimals: pool.wantDecimals || 18,
      market: pool.market,
      marketSymbol: pool.marketSymbol,
      farmUrl: pool.farmUrl,
    });
  }, []);

  const allPools = useMemo(() => {
    if (!config?.farms) {
      return [];
    }
    return flatten(
      config?.farms.map((t) =>
        t.pools.map((p) => Object.assign(p, { masterChef: t.masterChef })),
      ),
    );
  }, [config?.farms]);

  const isNoData = useMemo(() => {
    if (poolDeposits.length === 0) return false;
    return poolDeposits.filter((p) => p.deposit).length === 0;
  }, [poolDeposits]);

  const onFarmTypeSelected = useCallback((_ft) => {
    setFarmType(_ft && _ft.value);
  }, []);

  const onFarmRewardSelected = useCallback((_ft) => {
    setFarmReward(_ft && _ft.value);
  }, []);

  const onCheckboxChange = useCallback(() => {
    setShowOnlyDeposit((state) => !state);
  }, []);

  const onChangeInactiveFilter = useCallback(() => {
    setShowOnlyInactive((state) => !state);
  }, []);

  const isVisible = useCallback(
    (p: FarmingPool) => {
      let _visible = true;
      switch (farmType) {
        case 'stable':
          _visible = p.stable;
          break;
        case 'single':
          _visible = !p.isLp;
          break;
        case 'profit':
          _visible = p.profitSharing;
          break;
      }

      if (showOnlyInactive) {
        _visible = p.inactive;
      } else {
        _visible = !p.inactive;
      }

      if (!_visible) {
        return false;
      }

      _visible =
        farmReward === 'all' || p.rewardToken.toLowerCase() === farmReward.toLowerCase();
      return _visible;
    },
    [farmReward, farmType, showOnlyInactive],
  );

  const updatePoolDeposit = useCallback((index: number, deposit: boolean) => {
    setPoolDeposits((state) => {
      const current = state.find((i) => i.id === index);
      if (current) {
        return state.map((item, idx) => {
          if (idx != index) {
            return item;
          }

          return {
            ...item,
            deposit,
          };
        });
      } else {
        return [...state, { id: index, deposit }];
      }
    });
  }, []);

  return (
    <Page>
      <StyledHeader>
        <StyledStakeTvl>
          <img src={Icon} style={{ width: '60px' }} />
          <div className="info">
            <StyledStakeTvlTitle>Total Value Locked</StyledStakeTvlTitle>
            <StyledStakeTvlValue>
              {tvl ? (
                '$' + numberWithCommas(tvl)
              ) : (
                <Loading size={'24px'} color={theme.color.white} />
              )}
            </StyledStakeTvlValue>
          </div>
        </StyledStakeTvl>
        <StyleFilters>
          <StyledSwitch>
            <StyledSwitchItem
              onClick={onChangeInactiveFilter}
              disabled={!showOnlyInactive}
              highlight={!showOnlyInactive}
            >
              Active
            </StyledSwitchItem>
            <StyledSwitchItem
              onClick={onChangeInactiveFilter}
              disabled={showOnlyInactive}
              highlight={showOnlyInactive}
            >
              Inactive
            </StyledSwitchItem>
          </StyledSwitch>
          <StyledSwitchDeposit>
            <Switch
              onChange={onCheckboxChange}
              checked={showOnlyDeposit}
              onColor="#463b11"
              onHandleColor={theme.color.primary.main}
              offColor="#1a1d2f"
              offHandleColor="#8f929a"
              boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
              activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
              handleDiameter={22}
              uncheckedIcon={false}
              checkedIcon={false}
              height={16}
              width={40}
            />
            <span>Deposited</span>
          </StyledSwitchDeposit>
          <StyledDropdowns>
            <StyledDropdownItem>
              Type
              <StyledHeaderSelect
                defaultValue={allFarmTypes[0]}
                classNamePrefix="header-select"
                options={allFarmTypes}
                onChange={onFarmTypeSelected}
              />
            </StyledDropdownItem>
            <StyledDropdownItem>
              Reward
              <StyledHeaderSelect
                defaultValue={allFarmRewards[0]}
                classNamePrefix="header-select"
                options={allFarmRewards}
                onChange={onFarmRewardSelected}
              />
            </StyledDropdownItem>
          </StyledDropdowns>
        </StyleFilters>
      </StyledHeader>
      <StyledBody>
        {isNoData && (
          <StyledNoFarm>
            <img src={noFarm} />
            No farm
          </StyledNoFarm>
        )}
        <StyledFarmGrid>
          <StyledFarmGridHeader>
            <StyledFarmGridHeaderCell>Asset</StyledFarmGridHeaderCell>
            <StyledFarmGridHeaderCell>Rewards</StyledFarmGridHeaderCell>
            <StyledFarmGridHeaderCell>Deposited</StyledFarmGridHeaderCell>
            <StyledFarmGridHeaderCell>TVL</StyledFarmGridHeaderCell>
            <StyledFarmGridHeaderCell>
              Rates
              <Popover content="Daily compounding" position="left">
                <i className="fas fa-question-circle"></i>
              </Popover>
            </StyledFarmGridHeaderCell>
          </StyledFarmGridHeader>
          <StyledFarmGridBody>
            {(allPools || []).map((p, index) => {
              return (
                <FarmItem
                  key={index}
                  index={index}
                  visible={isVisible(p)}
                  data={
                    p.farmUrl
                      ? getPartnerPoolData(p.partnerPoolAddress)
                      : getPoolData(p.id, p.masterChef)
                  }
                  expanded={expanded === index}
                  toggle={toggle}
                  poolConfig={getPoolConfig(p, p.masterChef)}
                  onlyDeposit={showOnlyDeposit}
                  updatePoolDeposit={updatePoolDeposit}
                />
              );
            })}
          </StyledFarmGridBody>
        </StyledFarmGrid>
        <Spacer size="lg" />
      </StyledBody>
    </Page>
  );
};

const StyledFarmGrid = styled.div``;

const StyledFarmGridHeader = styled.div`
  display: grid;
  grid-template-columns: 5fr 5fr 3fr 4fr 3fr 1fr;
  grid-gap: 10px;
  @media (max-width: 768px) {
    display: none;
  }
`;

const StyledFarmGridHeaderCell = styled.div`
  padding: 0px 10px;
  margin-bottom: 5px;
  font-weight: 500;
  font-size: 14px;
  color: #86beff;
  display: flex;
  align-items: center;
`;

const StyledFarmGridBody = styled.div`
  display: grid;
  grid-template-columns: repeat(1 1fr);
  grid-gap: 20px;
`;

const StyledNoFarm = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 100px auto;
  font-size: 16px;
  font-weight: normal;
  color: #8f929a;
  img {
    width: 120px;
    margin-bottom: 14px;
  }
`;

const StyledSwitchDeposit = styled.div`
  display: flex;
  align-items: center;
  margin-left: 15px;
  span {
    margin-left: 10px;
    font-size: 16px;
    font-weight: normal;
  }
  @media (max-width: 768px) {
    margin-left: 0px;
    margin-bottom: 5px;
  }
`;

export const StyledDropdowns = styled.div`
  margin-left: auto;
  display: flex;
  @media (max-width: 768px) {
    align-items: center;
    margin-left: 0;
  }
`;
export const StyledDropdownItem = styled.div`
  display: flex;
  align-items: center;
  margin-left: 20px;
`;

export const StyledHeaderSelect = styled(Select)`
  min-width: 155px;
  margin-left: 10px;
  .header-select__control {
    background-color: transparent;
    border-color: #3b3c48;
    padding: 0px 0px;
    border-radius: 6px;
    :hover {
      border-color: #717179;
    }
  }
  .header-select__control--is-focused {
    border-color: #717179;
    outline: none;
    box-shadow: none;
  }
  .header-select__single-value {
    color: ${({ theme }) => theme.color.secondary};
    font-size: 15px;
    font-weight: 500;
    border-color: #3b3c48;
  }
  .header-select__menu {
    margin-top: 0;
    color: ${({ theme }) => theme.color.secondary};
    font-size: 14px;
    font-weight: normal;
    background-color: ${({ theme }) => theme.color.bg};
  }
  .header-select__indicator-separator {
    display: none;
  }
  .header-select__option--is-selected {
    background-color: transparent;
    color: ${({ theme }) => theme.color.secondary};
  }
  .header-select__option--is-focused {
    background-color: ${({ theme }) => theme.color.primary.main};
    color: ${({ theme }) => theme.color.white};
  }
  @media (max-width: 768px) {
    min-width: 120px;
  }
`;

export const StyledHeader = styled.div`
  width: 100%;
  @media (max-width: 768px) {
    flex-wrap: wrap;
    flex-direction: column;
    align-items: flex-start;
  }
`;

export const StyleFilters = styled.div`
  display: flex;
  align-items: center;
  margin-top: 20px;
  margin-bottom: 30px;
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export const StyledSwitch = styled.div`
  display: flex;
  align-items: center;
  border: solid 1px #383e4b;
  border-radius: 6px;
  overflow: hidden;
  background-color: #0b0c17;
  padding: 3px;
  @media (max-width: 768px) {
    margin-bottom: 20px;
  }
`;

export const StyledSwitchItem = styled.button<{ highlight?: boolean }>`
  border-radius: 4px;
  appearance: none;
  background-color: ${({ highlight }) => (!highlight ? 'transparent' : '#1a1d2f')};
  border: none;
  color: ${({ highlight, theme }) =>
    highlight ? theme.color.primary.main : theme.color.secondary};
  text-transform: uppercase;
  font-weight: 500;
  width: 100px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: ease-in-out 150ms;
  font-size: 12px;
  text-decoration: none;
  pointer-events: ${({ highlight }) => (highlight ? 'none' : 'auto')};
  &:hover {
    color: #f8ae4d;
  }
`;

export const StyledStakeTvl = styled.div`
  display: flex;
  align-items: flex-end;
  margin-bottom: 20px;
  .info {
    margin-left: 20px;
  }
  @media (max-width: 768px) {
    flex: 1;
    margin-right: 0;
  }
`;

export const StyledStakeTvlTitle = styled.div`
  font-size: 14px;
  font-weight: 500;
  color: #ffffff;
  text-transform: capitalize;
  margin-right: 10px;
  text-transform: uppercase;
`;

export const StyledStakeTvlValue = styled.div`
  font-size: 33px;
  font-weight: 500;
  color: #00dc2d;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
`;

export const StyledBody = styled.div``;

export default Farms;
