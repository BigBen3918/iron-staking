import React, { useState } from 'react';
import styled from 'styled-components';
import imgSynthetics from '../../../assets/img/ic-synthetics.svg';
import imgMint from '../../../assets/img/img-mint.svg';
import imgRedeem from '../../../assets/img/img-redeem.svg';
import imgStaking from '../../../assets/img/img-staking.svg';
import { NavLink } from 'react-router-dom';
import { ProgressBar } from './ProgressBar';
import { StyledGrid, StyledGridItem } from '../Dashboard';
import useIronBankInfo from 'src/hooks/useIronBankInfo';
import PieChart from 'src/components/PieChart';
import useCollateralRatio from 'src/hooks/useCollateralRatio';
import Loading from 'src/components/Loading';
import Number from 'src/components/Number';

const CollateralInfo: React.FC = () => {
  const info = useIronBankInfo();
  const { collateralRatio, loading } = useCollateralRatio();

  const [foundryInfo] = useState<{
    nextEpochPoint: Date;
    epochLength: number;
  }>();

  return (
    <StyledCollateralInfo>
      <StyledGrid>
        <StyledGridItem col={[1, 3]} row={[1, 3]}>
          <StyledCollateralContainer>
            <StyledHeader>
              <StyledHeaderItem>
                <StyledHeaderTitle>Target Collateral Ratio</StyledHeaderTitle>
                <StyledHeaderValue>
                  {info ? (
                    <Number
                      value={info?.targetCollateralRatio}
                      percentage={true}
                      decimals={6}
                      precision={2}
                    />
                  ) : (
                    '--'
                  )}
                  %
                </StyledHeaderValue>
              </StyledHeaderItem>
              <StyledHeaderItem>
                <StyledHeaderTitle>Effective Collateral Ratio</StyledHeaderTitle>
                <StyledHeaderValue>
                  {info ? (
                    <Number
                      value={info?.effectiveCollateralRatio}
                      percentage={true}
                      decimals={6}
                      precision={2}
                    />
                  ) : (
                    '--'
                  )}
                  %
                </StyledHeaderValue>
              </StyledHeaderItem>
            </StyledHeader>
            <StyledChart>
              <div className="chart-info">
                {loading ? (
                  <StyledEcr>
                    <Loading size="20px" />
                  </StyledEcr>
                ) : (
                  <PieChart data={collateralRatio} />
                )}
              </div>
              <StyledChartInfo>
                <StyledChartInfoItem color="rgb(46, 186, 198)">
                  <div className="dot" />
                  <StyledTitle>
                    <span className="title-collateral">USDC in </span>Pool
                  </StyledTitle>
                  <StyledValue>{collateralRatio[0]?.ratio || '--'}%</StyledValue>
                </StyledChartInfoItem>
                <StyledChartInfoItem color="rgb(182, 80, 158)">
                  <div className="dot" />
                  <StyledTitle>
                    <span className="title-collateral">USDC in </span>AAVE
                  </StyledTitle>
                  <StyledValue>{collateralRatio[1]?.ratio || '--'}%</StyledValue>
                </StyledChartInfoItem>
                <StyledChartInfoItem color="rgb(240, 101, 10)">
                  <div className="dot" />
                  <StyledTitle>LITH</StyledTitle>
                  <StyledValue>{collateralRatio[2]?.ratio || '--'}%</StyledValue>
                </StyledChartInfoItem>
              </StyledChartInfo>
            </StyledChart>
          </StyledCollateralContainer>
        </StyledGridItem>
        <StyledGridItem col={[3, 4]} row={[1, 2]}>
          <StyledLink to="/bank?action=mint">
            <StyledFeature bg={imgMint}>
              <div className="title">Mint</div>
              <div className="description">Mint new IRON tokens</div>
              <div className="footer" />
            </StyledFeature>
          </StyledLink>
        </StyledGridItem>
        <StyledGridItem col={[4, 5]} row={[1, 2]}>
          <StyledLink to="/bank?action=redeem">
            <StyledFeature bg={imgRedeem}>
              <div className="title">Redeem</div>
              <div className="description">Redeem IRON tokens</div>
              <div className="footer" />
            </StyledFeature>
          </StyledLink>
        </StyledGridItem>
        <StyledGridItem col={[3, 4]} row={[2, 3]}>
          <StyledLink to="/farms">
            <StyledFeature bg={imgStaking}>
              <div className="title">Farms</div>
              <div className="description">Join our Liquidity Mining</div>
              <div className="footer" />
            </StyledFeature>
          </StyledLink>
        </StyledGridItem>
        <StyledGridItem col={[4, 5]} row={[2, 3]}>
          <StyledLink to="/">
            <StyledFeature bg={imgSynthetics}>
              <div className="title">Synthetics</div>
              <div className="description" style={{ color: '#f7b500' }}>
                Coming soon
              </div>
              <div className="footer">
                {info && (
                  <ProgressBar
                    to={foundryInfo?.nextEpochPoint}
                    length={foundryInfo?.epochLength}
                  />
                )}
              </div>
            </StyledFeature>
          </StyledLink>
        </StyledGridItem>
      </StyledGrid>
    </StyledCollateralInfo>
  );
};

const StyledHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 13px;
  padding-bottom: 14px;
  border-bottom: 1px dashed #1b3f73;
`;

const StyledHeaderItem = styled.div``;

const StyledHeaderTitle = styled.div`
  font-size: 14px;
  font-weight: 500;
  color: #7f84b4;
`;

const StyledHeaderValue = styled.div`
  margin-top: 4px;
  font-size: 16px;
  font-weight: 500;
  color: #ffffff;
`;

const StyledChart = styled.div`
  display: flex;
  justify-content: space-around;
  .chart-info {
    position: relative;
    width: 40%;
  }
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    flex-direction: column;
    .chart-info {
      width: 100%;
    }
  }
`;

const StyledChartInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  font-weight: 500;
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    margin-top: 20px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    flex-wrap: wrap;
  }
`;

const StyledEcr = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  font-size: 16px;
  font-weight: 500;
  color: #86beff;
`;

const StyledChartInfoItem = styled.div<{ color: string }>`
  display: flex;
  align-items: center;
  padding: 10px 2px;
  .dot {
    margin-right: 12px;
    width: 20px;
    height: 20px;
    border-radius: 3px;
    background: ${({ color }) => color};
  }
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    margin: 0 10px;
    .title-collateral {
      display: none;
    }
  }
`;

const StyledCollateralInfo = styled.div`
  margin-top: 18px;
`;

const StyledCollateralContainer = styled.div`
  width: 100%;
  padding: 30px 26px;
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: 30px 26px;
  }
`;

const StyledTitle = styled.div`
  font-size: 14px;
  color: #7f84b4;
`;

const StyledValue = styled.div`
  margin-left: 5px;
  font-size: 14px;
  color: #ffffff;
`;

const StyledLink = styled(NavLink)`
  width: 100%;
  text-decoration: none;
`;

const StyledFeature = styled.div<{ bg: string }>`
  padding: 41px 9px 26px 17px;
  height: 100%;
  overflow: hidden;
  border-radius: 10px;
  background-image: linear-gradient(to right, rgba(34, 59, 231, 0.43), rgba(52, 67, 249, 0.22));
  position: relative;
  .title {
    font-size: 16px;
    font-weight: 500;
    color: #ffffff;
  }
  .description {
    display: flex;
    margin-top: 8px;
    font-size: 13px;
    font-weight: normal;
    color: #e4e7ff;
    align-items: baseline;
    position: relative;
    z-index: 1;
  }
  .description:before {
    content: '';
    width: 118px;
    height: 118px;
    position: absolute;
    left: 0px;
    bottom: -57px;
    opacity: 0.03;
    background: #4d9cf9;
    border-radius: 100%;
  }
  .footer {
    width: 60%;
    height: 4px;
    margin-top: 10px;
  }
  ::after {
    content: '';
    background-image: url(${({ bg }) => bg});
    background-repeat: no-repeat;
    background-position: center right;
    position: absolute;
    left: 0;
    right: 9px;
    bottom: 0;
    top: 0;
  }
  ::before {
    content: '';
    width: 118px;
    height: 118px;
    position: absolute;
    left: -57px;
    top: 0;
    opacity: 0.02;
    background: #4d9cf9;
    border-radius: 100%;
  }
  :hover {
    background-image: linear-gradient(
      to right,
      rgba(52, 67, 249, 0.5),
      rgba(34, 59, 231, 0.43)
    );
  }
`;

export default CollateralInfo;
