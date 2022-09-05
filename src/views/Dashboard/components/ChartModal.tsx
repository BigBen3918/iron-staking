import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useGetStatistic } from '../../../api/backend-api';
import {
  TokenType,
  Period,
  Measurement,
  MeasurementDisplay,
  TokenSymbols,
  SampleRate,
} from '../../../api/models';
import Modal from '../../../components/Modal';
import styled from 'styled-components';
import TokenSymbol from '../../../components/TokenSymbol';
import PriceChart from 'src/components/PriceChart';
import Select from 'react-select';

const ChartDollarOptions = [
  { value: 'polygon_iron_price', label: 'Price' },
  { value: 'polygon_iron_supply', label: 'Supply' },
  { value: 'polygon_iron_market_cap', label: 'Marketcap' },
];

const ChartShareOptions = [
  { value: 'polygon_titan_price', label: 'Price' },
  { value: 'polygon_titan_supply', label: 'Supply' },
  { value: 'polygon_titan_market_cap', label: 'Marketcap' },
];

const PeriodOptions = [
  { value: 'lastDay', label: 'Day' },
  { value: 'lastWeek', label: 'Week' },
  { value: 'lastMonth', label: 'Month' },
  { value: 'lastYear', label: 'Year' },
  { value: 'allTime', label: 'All' },
];

interface ChartModalProps {
  initMeasurement: Measurement;
  tokenType?: TokenType;
  onDismiss?: () => void;
}

const ChartModal: React.FC<ChartModalProps> = ({ tokenType, initMeasurement, onDismiss }) => {
  const [period, setPeriod] = useState<Period>('lastDay');
  const [measurement, setMeasurement] = useState<Measurement>(initMeasurement);
  const [sampleRate, setSampleRate] = useState<SampleRate>('hourly');
  const getStatistic = useGetStatistic(measurement, period, sampleRate);
  const [statisticData, setStatisticData] = useState<[number, number][]>([]);

  useEffect(() => {
    let mounted = true;
    getStatistic().then((res) => {
      if (mounted) {
        setStatisticData(res);
      }
    });
    return () => (mounted = false);
  }, [getStatistic]);

  useEffect(() => {
    if (period === 'lastDay' || period === 'lastWeek') {
      setSampleRate('hourly');
    }
    if (period === 'lastMonth' || period === 'lastYear' || period === 'allTime') {
      setSampleRate('daily');
    }
  }, [period]);

  const chartName = useMemo(() => {
    return MeasurementDisplay[measurement];
  }, [measurement]);

  const chartPrice = useMemo(() => {
    switch (tokenType) {
      case 'dollar': {
        return `1 IRON = 1 USD`;
      }
      case 'share': {
        return `1 LITH = 60USD`;
      }
      default:
        return '';
    }
  }, [tokenType]);

  const chartTitle = useMemo(() => {
    if (tokenType === 'dollar') {
      if (measurement === 'polygon_iron_price') return 'IRON Price';
      if (measurement === 'polygon_iron_supply') return 'IRON Supply';
      if (measurement === 'polygon_iron_marketcap') return 'IRON Marketcap';
    }
    if (tokenType === 'share') {
      if (measurement === 'polygon_titan_price') return 'LITH Price';
      if (measurement === 'polygon_titan_supply') return 'LITH Supply';
      if (measurement === 'polygon_titan_marketcap') return 'LITH Marketcap';
    }
    return 'Value';
  }, [measurement, tokenType]);

  const unit = useMemo(() => {
    if (period === 'lastDay') {
      return 'hour';
    }
    if (period === 'lastWeek') {
      return 'day';
    }
    if (period === 'lastMonth') {
      return 'week';
    }
    if (period === 'lastYear') {
      return 'month';
    }
    if (period === 'allTime') {
      return 'month';
    }
    return 'hour';
  }, [period]);

  const onChartTypeSelected = useCallback((item) => {
    setMeasurement(item.value);
  }, []);

  const onChartPeriodSelected = useCallback((item) => {
    setPeriod(item.value);
  }, []);

  return (
    <Modal size="lg" padding="50px" background={'#0D101F'}>
      <StyledModalHeader>
        <ModalCloseButton onClick={onDismiss}>
          <i className="fas fa-times"></i>
        </ModalCloseButton>
        <StyledHeaderIconWrapper>
          {tokenType && <TokenSymbol symbol={TokenSymbols[tokenType]} size={64} />}
          <StyledHeaderIconContent>
            <ChartName>{chartName}</ChartName>
            <ChartPrice>{chartPrice}</ChartPrice>
          </StyledHeaderIconContent>
        </StyledHeaderIconWrapper>
        <StyledGroupSelect>
          <StyledHeaderSelect
            defaultValue={tokenType === 'dollar' ? ChartDollarOptions[0] : ChartShareOptions[0]}
            classNamePrefix="header-select"
            options={tokenType === 'dollar' ? ChartDollarOptions : ChartShareOptions}
            onChange={onChartTypeSelected}
          />
          <StyledHeaderSelect
            defaultValue={PeriodOptions[0]}
            classNamePrefix="header-select"
            options={PeriodOptions}
            onChange={onChartPeriodSelected}
          />
        </StyledGroupSelect>
      </StyledModalHeader>
      <PriceChart
        data={statisticData}
        aspectRatio={2.25}
        color={'#ff7411'}
        gradientFrom={'rgba(255, 132, 0, 0.16)'}
        gradientTo={'rgba(239, 131, 0, 0)'}
        title={chartTitle}
        iShowLine
        unit={unit}
      />
    </Modal>
  );
};

const StyledModalHeader = styled.div`
  margin-bottom: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #0d101f;
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    flex-direction: column;
  }
`;

const ModalCloseButton = styled.div`
  position: absolute;
  right: 18px;
  top: 8px;
  font-size: 1.2rem;
  color: ${(props) => props.theme.color.secondary};
  opacity: 0.7;
  cursor: pointer;
  &:hover {
    color: ${(props) => props.theme.color.white};
    opacity: 1;
  }
`;

const StyledHeaderIconWrapper = styled.div`
  display: flex;
  flex: 4;
`;

const StyledHeaderIconContent = styled.div`
  margin-left: 10px;
`;
const StyledGroupSelect = styled.div`
  display: flex;
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    margin-top: 20px;
  }
`;

const ChartName = styled.div`
  font-size: 1.25rem;
  font-weight: 700;
  color: ${(props) => props.theme.color.white};
  text-transform: uppercase;
`;

const ChartPrice = styled.div`
  font-size: 14px;
  font-weight: normal;
  color: ${(props) => props.theme.color.grey[400]};
  text-transform: uppercase;
`;

const StyledHeaderSelect = styled(Select)`
  min-width: 155px;
  margin-right: 15px;
  .header-select__control {
    background-color: transparent;
    border-color: #3b3c48;
    padding: 4px 0px;
    border-radius: 10px;
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
`;

export default ChartModal;
