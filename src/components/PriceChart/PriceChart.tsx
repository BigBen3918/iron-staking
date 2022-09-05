import React, { useEffect, useMemo, useRef, useState } from 'react';
import 'chartjs-adapter-date-fns';
import {
  Chart,
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  TimeScale,
  Tooltip,
  InteractionMode,
  FontSpec,
  Filler,
} from 'chart.js';
import enUS from 'date-fns/locale/en-US';
import { useTheme } from 'styled-components';
import { numberWithCommas } from 'src/utils/formatBN';
Chart.register(
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  TimeScale,
  Tooltip,
  Filler,
);

export interface PriceChartProps {
  isSmall?: boolean;
  data: [number, number][];
  aspectRatio?: number;
  color?: string;
  gradientFrom?: string;
  gradientTo?: string;
  title?: string;
  iShowLine?: boolean;
  yAxisMin?: number;
  yAxisMax?: number;
  unit?:
    | 'millisecond'
    | 'second'
    | 'minute'
    | 'hour'
    | 'day'
    | 'week'
    | 'month'
    | 'quarter'
    | 'year';
}

const PriceChart: React.FC<PriceChartProps> = ({
  isSmall,
  data,
  aspectRatio,
  color,
  gradientFrom,
  gradientTo,
  title,
  iShowLine,
  unit,
  yAxisMax,
  yAxisMin,
}) => {
  const theme = useTheme();
  const chartRef = useRef<HTMLCanvasElement>();
  const [diamondPriceChart, setDiamondPriceChart] = useState<Chart | undefined>(undefined);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const optionDefault = useMemo<any>(() => {
    if (!theme) return null;
    return {
      aspectRatio: aspectRatio || 2,
      interaction: {
        mode: 'index' as InteractionMode,
        intersect: false,
      },
      stacked: false,
      scales: {
        xAxis: {
          type: 'time',
          time: {
            unit: unit || 'hour',
          },
          display: iShowLine ? true : false,
          startAngle: 10,
          grid: {
            display: false,
          },
          ticks: {
            color: '#666666',
            padding: 10,
            font: {
              size: 12,
              style: 'normal',
              weight: '400',
              family: 'Gordita',
            } as FontSpec,
            maxTicksLimit: 10,
            maxRotation: 0,
            minRotation: 0,
          },
          adapters: {
            date: {
              locale: enUS,
            },
          },
        },
        yAxis: {
          display: iShowLine ? true : false,
          grid: {
            color: '#20222d',
            lineWidth: 0.75,
            drawBorder: false,
            drawTicks: false,
          },
          ticks: {
            color: '#666666',
            padding: 20,
            font: {
              size: 12,
              style: 'normal',
              weight: '400',
              family: 'Gordita',
            } as FontSpec,
          },
          min: title === 'IRON Price' ? 0.6 : 0,
          max: title === 'IRON Price' ? 1.4 : null,
        },
      },
      plugins: {
        tooltip: {
          enabled: true,
          backgroundColor: '#0b0c17',
          titleColor: '#ff7411',
          titleAlign: 'center',
          titleFont: {
            style: 'normal',
            size: 12,
          } as FontSpec,
          bodyColor: '#ffffff',
          bodyAlign: 'center',
          bodyFont: {
            size: 12,
            style: 'normal',
          } as FontSpec,
          borderColor: '#3292ff38',
          borderWidth: 0.5,
          cornerRadius: 8,
          padding: 10,
          displayColors: false,
          callbacks: {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            label: function (context: any) {
              return `${title || 'TVL'}: ${numberWithCommas(context.parsed.y.toString())}`;
            },
          },
        },
        legend: {
          display: false,
        },
      },
      elements: {
        point: {
          pointStyle: 'circle',
          radius: 0,
          hoverBorderWidth: 6,
          hoverRadius: iShowLine ? 6 : 0,
        },
      },
      animation: {
        duration: 600,
        easing: 'linear',
      },
    };
  }, [theme, aspectRatio, title, iShowLine, unit]);

  const optionSmall = useMemo(() => {
    return {
      aspectRatio: aspectRatio || 2,
      scales: {
        xAxis: {
          type: 'time',
          display: false,
          adapters: {
            date: {
              locale: enUS,
            },
          },
        },
        yAxis: {
          display: false,
          min: yAxisMin,
          max: yAxisMax,
        },
      },
      plugins: {
        tooltip: {
          enabled: false,
        },
        legend: {
          display: false,
        },
      },
      elements: {
        point: {
          pointStyle: 'line',
          radius: 0,
        },
      },
    };
  }, [aspectRatio, yAxisMax, yAxisMin]);

  useEffect(() => {
    if (!data || !diamondPriceChart) return;
    const chartData = data.map((t) => {
      return {
        x: t[0] * 1000,
        y: t[1],
      };
    });
    if (!diamondPriceChart.data.datasets[0]) return;
    diamondPriceChart.data.datasets[0].data = chartData;
    diamondPriceChart.update();
  }, [data, diamondPriceChart]);

  useEffect(() => {
    if (!chartRef?.current || !theme) return;

    const priceChart = new Chart(chartRef.current, {
      type: 'line',
      data: {
        datasets: [
          {
            data: [],
            borderColor: color || '#ff7411',
            borderWidth: isSmall ? 2 : 3,
            fill: false,
          },
        ],
      },
      options: isSmall ? optionSmall : optionDefault,
    });

    setDiamondPriceChart(priceChart);
    return function cleanup() {
      priceChart?.destroy();
    };
  }, [chartRef, theme, optionDefault, optionSmall, isSmall, color, gradientFrom, gradientTo]);

  return (
    <>
      <canvas ref={chartRef}></canvas>
    </>
  );
};

export default PriceChart;
