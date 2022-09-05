import { useState } from 'react';
import { PieChartItem } from 'src/components/PieChart/PieChart';
import useMulticall from './useMulticall';

const useCollateralRatio = () => {
  const [collateralRatio] = useState<PieChartItem[]>([
    {
      title: 'USDC in pool',
      ratio: 30,
      value: 300000,
      color: 'rgb(46, 186, 198)',
    },
    {
      title: 'USDC in AAVE',
      ratio: 30,
      value: 300000,
      color: 'rgb(182, 80, 158)',
    },
    {
      title: 'LITH',
      ratio: 40,
      value: 400000,
      color: 'rgb(240, 101, 10)',
    },
  ]);
  const [loading] = useState(false);

  return { collateralRatio, loading };
};

export default useCollateralRatio;
