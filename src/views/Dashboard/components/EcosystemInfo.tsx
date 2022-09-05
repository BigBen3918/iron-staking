import React, { useMemo, useState } from 'react';
import { BigNumber } from '@ethersproject/bignumber';
import { Col, Row } from 'src/components/Layout';
import styled from 'styled-components';
import ecoIron from '../../../assets/img/eco-iron.png';
import ecoLottery from '../../../assets/img/lottery.png';
import ecoLending from '../../../assets/img/eco-lending.png';
import iconIron from '../../../assets/img/IRON-logo.png';
import iconLottery from '../../../assets/img/icon-lottery.svg';
import iconLending from '../../../assets/img/icon-lending.svg';
import iconSwap from '../../../assets/img/stable-swap-icon.svg';
import imgStableSwap from '../../../assets/img/stable-swap.png';
import { isPast } from 'date-fns';
import NextDrawCountdown from './NextDrawCountdown';
import Number from 'src/components/Number';

const EcosystemInfo: React.FC = () => {
  const [lotteryTime] = useState<Date | undefined>(undefined);
  const [prizePool] = useState<BigNumber>(BigNumber.from(0));

  const isPastClosing = useMemo(() => {
    return isPast(lotteryTime);
  }, [lotteryTime]);

  return (
    <StyledEcosystemInfo>
      IRON Ecosystem
      <StyledContent>
        <CustomRow>
          <Col xl={3}>
            <StyledItem>
              <img src={ecoIron} />
              <div className="content">
                <img src={iconIron} />
                IRON Stablecoin
              </div>
            </StyledItem>
          </Col>
          <Col xl={3}>
            <StyledItem
              href="https://dragonball.iron.finance/"
              target="_blank"
              rel="noopener noreferrer"
            >
              {prizePool && prizePool.gt(0) && (
                <div className="prizePool">
                  $<Number value={prizePool} decimals={18} precision={0} keepZeros={true} />
                </div>
              )}
              <img src={ecoLottery} />
              <div className="content">
                <div className="countdown">
                  Next round:
                  {isPastClosing ? (
                    <span>Not started</span>
                  ) : (
                    <NextDrawCountdown to={lotteryTime} />
                  )}
                </div>
                <img src={iconLottery} />
                DragonBall Lottery
              </div>
            </StyledItem>
          </Col>
          <Col xl={3}>
            <StyledItem>
              <StyledComing>Coming soon</StyledComing>
              <img src={ecoLending} />
              <div className="content">
                <img src={iconLending} />
                Lending
              </div>
            </StyledItem>
          </Col>
          <Col xl={3}>
            <StyledItem>
              <StyledComing>Coming soon</StyledComing>
              <img src={imgStableSwap}></img>
              <div className="content">
                <img src={iconSwap} />
                Stableswap
              </div>
            </StyledItem>
          </Col>
        </CustomRow>
      </StyledContent>
    </StyledEcosystemInfo>
  );
};

const StyledEcosystemInfo = styled.div`
  margin-top: 32px;
  padding-top: 32px;
  padding-bottom: 32px;
  font-size: 24px;
  font-weight: 500;
  color: #ffffff;
  border-top: 3px solid #15194a;
`;

const StyledContent = styled.div`
  margin-top: 15px;
`;

const CustomRow = styled(Row)`
  margin: -${(p) => p.gutter || '9px'};

  ${Col} {
    padding: ${(p) => p.gutter || '9px'};
    @media (max-width: ${({ theme }) => theme.breakpoints.xl}) {
      width: 50%;
    }
  }
`;

const StyledItem = styled.a`
  position: relative;
  border-radius: 10px;
  background: #1a1d2f;
  display: block;
  text-decoration: none;
  img {
    width: 100%;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
  }
  .prizePool {
    position: absolute;
    right: 0;
    top: 0;
    padding: 5px 20px;
    color: #fff;
    font-weight: 800;
    font-size: 18px;
    border-top-right-radius: 8px;
    border-bottom-left-radius: 8px;
    background-image: linear-gradient(100deg, #54df84 -21%, #00be44 94%);
  }
  .content {
    position: relative;
    display: flex;
    align-items: center;
    padding: 14px 17px;
    font-size: 16px;
    font-weight: 500;
    color: #ffffff;
    .countdown {
      bottom: 100%;
      margin-bottom: 8px;
      position: absolute;
      left: 0;
      right: 0;
      display: flex;
      align-items: flex-end;
      padding: 6px 21px;
      font-size: 12px;
      font-weight: normal;
      color: #ffffff;
      background: #00000047;
      span {
        margin-left: auto;
        font-weight: 500;
        color: #ffffff;
      }
    }
    img {
      width: 32px;
      height: 32px;
      margin-right: 12px;
    }
  }
  &[href]:hover {
    background: #272d4d;
  }
  @media (max-width: ${({ theme }) => theme.breakpoints.xxl}) {
    .content {
      padding: 14px 10px;
      img {
        width: 24px;
        height: 24px;
        margin-right: 12px;
      }
      font-size: 14px;
    }
  }
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    .content {
      .countdown {
        padding: 6px 10px;
      }
      img {
        width: 24px;
        height: 24px;
        margin-right: 12px;
      }
      font-size: 13px;
    }
  }
`;

const StyledComing = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  padding: 5px 10px;
  font-size: 13px;
  font-weight: 500;
  color: #ffffff;
  border-top-right-radius: 8px;
  border-bottom-left-radius: 8px;
  background-image: linear-gradient(100deg, #ff531f -21%, #ff9a18 94%);
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: 12px;
  }
`;

export default EcosystemInfo;
