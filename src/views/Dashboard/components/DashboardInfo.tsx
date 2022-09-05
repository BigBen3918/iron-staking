import React from 'react';
import styled from 'styled-components';
import iconDiamond from '../../../assets/img/ic-diamond.svg';
import iconIron from '../../../assets/img/ic-iron.svg';
import iconTitan from '../../../assets/img/titan.svg';
import iconPolygon from '../../../assets/img/polygon-chain.png';
import imgBinanceChain from '../../../assets/img/binance-chain.svg';
import iconLink from '../../../assets/img/link.svg';
import { useTokensInfo, useTotalValueLocked } from 'src/api/backend-api';
import { numberWithCommas } from 'src/utils/formatBN';
import TokenInfo from './TokenInfo';
import TokenDisplayDataBoxValue from './TokenDisplayDataBoxValue';
import { StyledGrid, StyledGridItem } from '../Dashboard';
import TotalValueLockChart from './TotalValueLockChart';
import { useConfiguration } from 'src/contexts/ConfigProvider/ConfigProvider';

const Tokens = ['iron', 'LITH'];

const DashboardInfo: React.FC = () => {
  const config = useConfiguration();
  const totalValueLocked = useTotalValueLocked();
  const tokensInfo = useTokensInfo(Tokens);

  return (
    <StyledGrid>
      <StyledGridItem col={[1, 3]} row={[1, 3]}>
        <StyledTotalValueLock>
          <StyledValueLockTitle>Total Value Locked</StyledValueLockTitle>
          <StyledValueLockValue>
            <TokenDisplayDataBoxValue isLoading={!totalValueLocked}>
              ${numberWithCommas(totalValueLocked?.total.toFixed(0))}
            </TokenDisplayDataBoxValue>
          </StyledValueLockValue>
          <StyledValueLockChart>
            <TotalValueLockChart />
          </StyledValueLockChart>
          <StyledValueLockFooter>
            <StyledValueLockItem>
              <StyledGroupIcon>
                <StyledImageItem>
                  <img src={iconTitan} />
                </StyledImageItem>
                <StyledIconLink src={iconLink} />
                <StyledImageItem>
                  <img src={iconPolygon} />
                </StyledImageItem>
              </StyledGroupIcon>
              <div className="info">
                <StyledTitleItem>IRON on Polygon</StyledTitleItem>
                <StyledValueItem>
                  <TokenDisplayDataBoxValue isLoading={!totalValueLocked} isSmallSize>
                    ${numberWithCommas(totalValueLocked?.ironPolygon?.toFixed(0))}
                  </TokenDisplayDataBoxValue>
                </StyledValueItem>
              </div>
            </StyledValueLockItem>
            <StyledValueLockItem>
              <StyledGroupIcon>
                <StyledImageItem>
                  <img src={iconIron} />
                </StyledImageItem>
                <StyledIconLink src={iconLink} />
                <StyledImageItem>
                  <img src={imgBinanceChain} />
                </StyledImageItem>
              </StyledGroupIcon>
              <div className="info">
                <StyledTitleItem>IRON on BSC</StyledTitleItem>
                <StyledValueItem>
                  <TokenDisplayDataBoxValue isLoading={!totalValueLocked} isSmallSize>
                    ${numberWithCommas(totalValueLocked?.iron.toFixed(0))}
                  </TokenDisplayDataBoxValue>
                </StyledValueItem>
              </div>
            </StyledValueLockItem>
            <StyledValueLockItem>
              <StyledGroupIcon>
                <StyledImageItem>
                  <img src={iconDiamond} />
                </StyledImageItem>
                <StyledIconLink src={iconLink} />
                <StyledImageItem>
                  <img src={imgBinanceChain} />
                </StyledImageItem>
              </StyledGroupIcon>
              <div className="info">
                <StyledTitleItem>DiamondHand on BSC</StyledTitleItem>
                <StyledValueItem>
                  <TokenDisplayDataBoxValue isLoading={!totalValueLocked} isSmallSize>
                    ${numberWithCommas(totalValueLocked?.diamond.toFixed(0))}
                  </TokenDisplayDataBoxValue>
                </StyledValueItem>
              </div>
            </StyledValueLockItem>
          </StyledValueLockFooter>
        </StyledTotalValueLock>
      </StyledGridItem>
      <StyledGridItem col={[3, 5]} row={[1, 2]}>
        <TokenInfo
          token={'IRON'}
          price={tokensInfo?.iron.price}
          totalSupply={tokensInfo?.iron.totalSupply}
          marketCap={tokensInfo?.iron.marketCap}
          loading={!tokensInfo}
          measurement="polygon_iron_price"
          tokenType="dollar"
          aspectRatio={2}
          color={'#ff7411'}
          gradientTo="rgba(255, 132, 0, 0.16)"
          gradientFrom="rgba(239, 131, 0, 0)"
          buyLink={config.buyDollarHref}
        />
      </StyledGridItem>
      <StyledGridItem col={[3, 5]} row={[2, 3]}>
        <TokenInfo
          token={'LITH'}
          price={tokensInfo?.titan.price}
          totalSupply={tokensInfo?.titan.totalSupply}
          marketCap={tokensInfo?.titan.marketCap}
          loading={!tokensInfo}
          measurement="polygon_titan_price"
          tokenType="share"
          aspectRatio={2}
          color={'#00a3ff'}
          gradientFrom="rgba(13, 42, 250, 0)"
          gradientTo="rgba(0, 25, 255, 0.16)"
          buyLink={config.buyShareHref}
        />
      </StyledGridItem>
    </StyledGrid>
  );
};

const StyledTotalValueLock = styled.div`
  display: block;
  padding: 30px 26px;
  @media (max-width: ${({ theme }) => theme.breakpoints.xl}) {
    margin-bottom: 18px;
  }
`;

const StyledValueLockTitle = styled.div`
  font-size: 16px;
  font-weight: 500;
  color: #86beff;
`;

const StyledValueLockValue = styled.div`
  margin-top: 16px;
  font-size: 32px;
  color: #00dc2d;
  font-weight: 600;
`;

const StyledValueLockChart = styled.div`
  margin: 30px 0px;
`;

const StyledValueLockFooter = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 38px;
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    flex-direction: column;
  }
`;

const StyledValueLockItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    margin-bottom: 20px;
    flex-direction: row;
    .info {
      display: flex;
      width: 100%;
    }
  }
`;

const StyledGroupIcon = styled.div`
  display: flex;
  justify-content: center;
`;

const StyledImageItem = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  background-color: #181d4c;
  border-radius: 100%;
  img {
    width: 24px;
  }
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    :last-child {
      margin-left: -10px;
      margin-right: 10px;
    }
  }
`;

const StyledIconLink = styled.img`
  width: 17px;
  margin: 0px 2px;
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    display: none;
  }
`;

const StyledTitleItem = styled.div`
  font-size: 13px;
  font-weight: 500;
  margin-top: 16px;
  color: #7f84b4;
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    margin-top: 10px;
  }
`;

const StyledValueItem = styled.div`
  margin-top: 6px;
  font-size: 16px;
  font-weight: 500;
  color: #ffffff;
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    display: flex;
    margin-left: auto;
  }
`;

export default DashboardInfo;
