import React, { useEffect, useMemo, useRef, useState } from 'react';
import 'chartjs-adapter-date-fns';
import {
  Chart,
  Title,
  Tooltip,
  Filler,
  ArcElement,
  FontSpec,
  DoughnutController,
  Legend,
} from 'chart.js';
import { useTheme } from 'styled-components';
import { numberWithCommas } from 'src/utils/formatBN';
Chart.register(Title, Tooltip, Filler, ArcElement, DoughnutController, Legend);

export type PieChartItem = {
  title: string;
  value: number;
  ratio: number;
  color: string;
};

export interface PieChartProps {
  data: PieChartItem[];
}

const PieChart: React.FC<PieChartProps> = ({ data }) => {
  const theme = useTheme();
  const chartRef = useRef<HTMLCanvasElement>();
  const [pieChart, setPieChart] = useState<Chart | undefined>(undefined);

  const labels = useMemo(() => {
    return data.map((i) => i.title);
  }, [data]);

  const values = useMemo(() => {
    return data.map((i) => i.value);
  }, [data]);

  const colors = useMemo(() => {
    return data.map((i) => i.color);
  }, [data]);

  useEffect(() => {
    if (!pieChart) return;
    pieChart.data.labels = labels;
    pieChart.data.datasets[0].data = values;
    pieChart.data.datasets[0].backgroundColor = colors;
    pieChart.update();
  }, [colors, data, labels, pieChart, values]);

  useEffect(() => {
    if (!chartRef?.current || !theme) return;
    const PieChart = new Chart(chartRef.current, {
      type: 'doughnut',
      data: {
        labels: [],
        datasets: [
          {
            backgroundColor: [],
            data: [],
            hoverOffset: 1,
          },
        ],
      },
      options: {
        plugins: {
          tooltip: {
            enabled: true,
            titleAlign: 'center',
            titleFont: {
              style: 'normal',
              size: 12,
              family: 'Gordita',
            } as FontSpec,
            bodyAlign: 'center',
            bodyFont: {
              size: 12,
              style: 'normal',
              family: 'Gordita',
            } as FontSpec,
            borderColor: '#ffffff',
            borderWidth: 0.5,
            cornerRadius: 8,
            padding: 10,
            displayColors: false,
            callbacks: {
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              label: function (context: any) {
                return `${context.label}: ${
                  context.label !== 'LITH' ? '$' : '~$'
                }${numberWithCommas(context.parsed.toString())}`;
              },
            },
          },
          legend: {
            display: false,
            position: 'right',
          },
        },
        elements: {
          arc: {
            borderWidth: 0,
          },
        },
        layout: {
          padding: 20,
        },
      },
    });

    setPieChart(PieChart);
    return function cleanup() {
      PieChart?.destroy();
    };
  }, [chartRef, theme]);

  return (
    <>
      <canvas ref={chartRef}></canvas>
    </>
  );
};

export default PieChart;
