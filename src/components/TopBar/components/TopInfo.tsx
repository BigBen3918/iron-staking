import React, { useCallback } from 'react';
import { useConfiguration } from 'src/contexts/ConfigProvider/ConfigProvider';
import useModalWithFC from 'src/hooks/useModalWithFC';
import ChartModal from 'src/views/Dashboard/components/ChartModal';
import styled from 'styled-components';
import useIronBankInfo from '../../../hooks/useIronBankInfo';
import Amount from '../../Amount';
import Container from '../../Container';
import Number from '../../Number';

const TopInfo: React.FC = () => {
  const info = useIronBankInfo();
  const config = useConfiguration();

  const { showModal } = useModalWithFC();

  const showDollarChart = useCallback(() => {
    showModal(ChartModal, {
      tokenType: 'dollar',
      initMeasurement: 'polygon_iron_price',
    });
  }, [showModal]);

  const showShareChart = useCallback(() => {
    showModal(ChartModal, {
      tokenType: 'share',
      initMeasurement: 'polygon_titan_price',
    });
  }, [showModal]);

  const showTcrChart = useCallback(() => {
    showModal(ChartModal, {
      initMeasurement: 'tcr',
    });
  }, [showModal]);

  return (
    <StyledInfoBar>
      <Container size="lg">
        <StyledInfoBarInner>
          <StyledInfoItem>
            <StyledInfoLabel>Target Collateral Ratio =</StyledInfoLabel>
            <StyledInfoValue>
              {info ? (
                <Number
                  value={info?.targetCollateralRatio}
                  percentage={true}
                  decimals={6}
                  precision={2}
                  keepZeros={true}
                />
              ) : (
                '--'
              )}
              %
            </StyledInfoValue>
            {config.enabledChart && (
              <StyledInfoSuffixIcon onClick={showTcrChart}>
                <i className="fas fa-chart-line"></i>
              </StyledInfoSuffixIcon>
            )}
          </StyledInfoItem>
          <StyledInfoItem>
            <StyledInfoLabel>Effective Collateral Ratio =</StyledInfoLabel>
            <StyledInfoValue>
              {info ? (
                <Number
                  value={info?.effectiveCollateralRatio}
                  percentage={true}
                  decimals={6}
                  precision={6}
                />
              ) : (
                '--'
              )}
              %
            </StyledInfoValue>
          </StyledInfoItem>
          <StyledInfoItem>
            <StyledInfoLabel>1 IRON =</StyledInfoLabel>
            <StyledInfoValue>
              {info ? <Number value={info?.dollarPrice} decimals={6} precision={6} /> : '--'}
            </StyledInfoValue>{' '}
            USD
            {config.enabledChart && (
              <StyledInfoSuffixIcon onClick={showDollarChart}>
                <i className="fas fa-chart-line"></i>
              </StyledInfoSuffixIcon>
            )}
          </StyledInfoItem>
          <StyledInfoItem>
            <StyledInfoLabel>1 LITH =</StyledInfoLabel>
            <StyledInfoValue>
              {info ? <Number value={info?.sharePrice} decimals={6} precision={6} /> : '--'}
            </StyledInfoValue>{' '}
            USD
            {config.enabledChart && (
              <StyledInfoSuffixIcon onClick={showShareChart}>
                <i className="fas fa-chart-line"></i>
              </StyledInfoSuffixIcon>
            )}
          </StyledInfoItem>
          <StyledInfoItem>
            <StyledInfoLabel>IRON Market Cap =</StyledInfoLabel>
            {'$ '}
            <StyledInfoValue>
              {info ? (
                <Amount value={info?.dollarMarketCap} decimals={24} precision={2} />
              ) : (
                '--'
              )}
            </StyledInfoValue>
          </StyledInfoItem>
        </StyledInfoBarInner>
      </Container>
    </StyledInfoBar>
  );
};
const StyledInfoBar = styled.div`
  background-color: ${({ theme }) => theme.color.blue[600]};
  width: 100%;
  padding: 10px 0;
`;
const StyledInfoBarInner = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  line-height: 1;
  font-size: 0.7rem;
  font-weight: 600;
  @media (max-width: 768px) {
    flex-wrap: wrap;
  }
`;

const StyledInfoItem = styled.div`
  padding: 0 10px;
  display: flex;
  align-items: center;
  @media (max-width: 768px) {
    padding: 5px 5px;
  }
`;

const StyledInfoSuffixIcon = styled.a`
  margin-left: 5px;
  color: ${({ theme }) => theme.color.primary.main};
  cursor: pointer;
  &:hover {
    color: ${({ theme }) => theme.color.primary.light};
  }
`;

const StyledInfoLabel = styled.span`
  margin-right: 5px;
  color: ${({ theme }) => theme.color.grey[200]};
`;

const StyledInfoValue = styled.span<{ negative?: boolean }>`
  color: ${({ theme, negative }) => (negative ? theme.color.danger : theme.color.success)};
`;

export default TopInfo;
