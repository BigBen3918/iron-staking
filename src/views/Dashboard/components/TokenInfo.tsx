import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import TokenSymbol from 'src/components/TokenSymbol';
import { useGetStatistic } from 'src/api/backend-api';
import Amount from 'src/components/Amount';
import Number from 'src/components/Number';
import TokenDisplayDataBoxValue from './TokenDisplayDataBoxValue';
import PriceChart from 'src/components/PriceChart';
import { Measurement, TokenType } from 'src/api/models';
import { BigNumber } from '@ethersproject/bignumber';
import ChartModal from './ChartModal';
import useModal from 'src/hooks/useModal';
import icMM from 'src/assets/img/mask@3x.png';

export type TokenInfoProps = {
  token: string;
  tokenType: 'share' | 'dollar';
  measurement: Measurement;
  price: BigNumber;
  totalSupply: BigNumber;
  marketCap: BigNumber;
  loading?: boolean;
  aspectRatio?: number;
  color?: string;
  gradientFrom?: string;
  gradientTo?: string;
  buyLink?: string;
};

const yAxisRange: Record<TokenType, [number, number]> = {
  dollar: [0.8, 1.4],
  share: [0, undefined],
};

const TokenInfo: React.FC<TokenInfoProps> = ({
  token,
  measurement,
  price,
  totalSupply,
  marketCap,
  loading,
  aspectRatio,
  color,
  gradientFrom,
  gradientTo,
  tokenType,
  buyLink,
}) => {
  const getStatistic = useGetStatistic(measurement, 'lastWeek', 'hourly');
  const [chartData, setChartData] = useState<[number, number][]>([]);
  const [showPriceChart] = useModal(
    <ChartModal tokenType={tokenType} initMeasurement={measurement}></ChartModal>,
  );

  useEffect(() => {
    let mounted = true;
    getStatistic().then((res) => {
      if (mounted) {
        setChartData(res);
      }
    });

    return () => (mounted = false);
  }, [getStatistic]);

  return (
    <StyledTokenItem>
      <StyledTokenItemHeader>
        {token ? (
          <TokenSymbol symbol={token} size={48} />
        ) : (
          <div style={{ height: '48px', width: '48px' }} />
        )}
        <div className="symbol">{token}</div>
        <div className="price">
          <div className="price-content">
            <div className="title">Price</div>
            <div className="value">
              <TokenDisplayDataBoxValue isLoading={loading} isSmallSize>
                $<Number value={price} decimals={6} precision={4} />
              </TokenDisplayDataBoxValue>
            </div>
            <StyleIconChart onClick={showPriceChart}>
              <i className="fas fa-chart-line"></i>
            </StyleIconChart>
          </div>
        </div>
      </StyledTokenItemHeader>
      <StyledTokenItemContent>
        <div>
          <StyledTokenInfo>
            <div className="title">Supply</div>
            <TokenDisplayDataBoxValue isLoading={loading} isSmallSize>
              <Amount value={totalSupply} decimals={18} precision={2} />
            </TokenDisplayDataBoxValue>
          </StyledTokenInfo>
          <StyledTokenInfo>
            <div className="title">Market cap</div>
            <TokenDisplayDataBoxValue isLoading={loading} isSmallSize>
              $<Amount value={marketCap} decimals={6} precision={2} />
            </TokenDisplayDataBoxValue>
          </StyledTokenInfo>
        </div>
        <div className="chart">
          <PriceChart
            data={chartData}
            isSmall
            aspectRatio={aspectRatio}
            color={color}
            gradientFrom={gradientFrom}
            gradientTo={gradientTo}
            title={`${token} Price`}
            yAxisMin={yAxisRange[tokenType][0]}
            yAxisMax={yAxisRange[tokenType][1]}
          />
        </div>
      </StyledTokenItemContent>
      <div className="links">
        <a className="mmLink">
          <img src={icMM} />
          <span>Add</span>
        </a>
        {buyLink && (
          <a className="mmLink" href={buyLink} target="_blank">
            <i className="fas fa-shopping-cart" />
            <span>Buy</span>
          </a>
        )}
      </div>
    </StyledTokenItem>
  );
};

const StyledTokenItem = styled.div`
  padding: 15px 16px;
  .links {
    display: flex;
    align-items: center;
    margin-top: 10px;
    .mmLink {
      display: flex;
      align-items: center;
      cursor: pointer;
      font-weight: 500;
      margin-right: 20px;
      text-decoration: none;
      color: #fea430;
      img {
        width: 18px;
        margin-right: 5px;
      }
      i {
        margin-right: 5px;
      }
      span {
        color: #fea430bb;
      }
      &:hover {
        span {
          color: #fea430;
        }
      }
    }
  }
`;

const StyledTokenItemHeader = styled.div`
  display: flex;
  align-items: center;
  .symbol {
    margin-left: 8px;
    font-size: 20px;
    font-weight: 500;
    color: #86beff;
    cursor: pointer;
  }
  .price {
    align-items: baseline;
    display: flex;
    align-items: center;
    margin-left: auto;
    .price-content {
      display: flex;
      align-items: baseline;
    }
    .buy {
      margin-right: 10px;
      color: #fff;
      text-decoration: none;
      &:after {
        content: '\u00B7';
        margin-left: 10px;
        font-weight: 700;
      }
      &:hover {
        color: ${(p) => p.theme.color.primary.main};
      }
    }
    .title {
      margin-right: 8px;
      font-size: 14px;
      color: #7f84b4;
    }
    .value {
      font-size: 18px;
      font-weight: 600;
      margin-right: 8px;
      color: #00d446;
    }
  }
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    .price {
      flex-direction: column;
      align-items: flex-start;
      .buy {
        margin-bottom: 5px;
        &:after {
          content: '';
        }
      }
    }
  }
`;

const StyledTokenItemContent = styled.div`
  display: flex;
  align-items: center;
  margin-top: 14px;
  .chart {
    width: 160px;
    margin-left: auto;
  }
`;

const StyledTokenInfo = styled.div`
  display: flex;
  margin-top: 16px;
  font-size: 14px;
  font-weight: 500;
  color: #ffffff;
  .title {
    margin-right: 10px;
    font-size: 14px;
    font-weight: normal;
    color: #7f84b4;
  }
`;

const StyleIconChart = styled.button`
  padding: 0px;
  margin: 0px 0px 0px 4px;
  font-size: 16px;
  background: transparent;
  border: none;
  color: #fea430;
  cursor: pointer;
`;

export default TokenInfo;
