import React from 'react';
import { useTvlStatistic } from 'src/api/backend-api';
import PriceChart from 'src/components/PriceChart';

const TotalValueLockChart: React.FC = () => {
  const chartData = useTvlStatistic('tvl', 'lastMonth', 'daily');

  return (
    <PriceChart
      data={chartData}
      aspectRatio={4.25}
      color={'#d502c2'}
      gradientFrom="rgba(191, 0, 239, 0)"
      gradientTo="rgba(202, 0, 170, 0.16)"
    />
  );
};

export default TotalValueLockChart;
