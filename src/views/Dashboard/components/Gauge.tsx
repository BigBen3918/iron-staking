import React, { useMemo } from 'react';

export type GaugeChartProps = {
  value: number;
};

export const GaugeChart: React.FC<GaugeChartProps> = ({ value }) => {
  const text = useMemo(() => {
    if (value) {
      return (value * 100).toFixed(2) + '%';
    }

    return '--.--%';
  }, [value]);

  const rotate = useMemo(() => {
    return value ? value * 180 : 0;
  }, [value]);

  return (
    <svg viewBox="0 0 200 140" className="gauge">
      <defs>
        <linearGradient id="path-fill">
          <stop offset="5%" stopColor="#d22121" />
          <stop offset="50%" stopColor="#f7b500" />
          <stop offset="95%" stopColor="#2dbb63" />
        </linearGradient>
        <linearGradient id="inner" x2="0%" y2="100%">
          <stop offset="0%" stopColor="rgba(42, 64, 201, 0.19) " />
          <stop offset="80%" stopColor="rgba(18, 24, 69, 0.41) " />
        </linearGradient>
      </defs>
      <path
        strokeDasharray="2 4.36"
        className="dial"
        stroke="url(#path-fill)"
        fill="none"
        strokeWidth="12"
        d="M 6 100 A 50 50 0 0 1 194 100"
      ></path>
      <path className="inner" fill="url(#inner)" d="M 20 100 A 50 50 0 0 1 180 100"></path>
      <g className="needle">
        <rect
          width="80"
          height="2"
          fill="#6236ff"
          x="20"
          y="99"
          rx="2"
          ry="2"
          style={{
            transformOrigin: 'right',
            transform: `rotate(${rotate}deg)`,
            transformBox: 'fill-box',
            transition: 'transform 0.3s ease-in',
          }}
        ></rect>
        <circle cx="100" cy="100" r="4" fill="#6236ff"></circle>
        <circle cx="100" cy="100" r="2" fill="#101438"></circle>
      </g>
      <g className="text-container">
        <text
          x="100"
          y="126"
          fill="#f7b500"
          className="value-text"
          fontSize="14"
          fontWeight="500"
          fontFamily="'Gordita', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;"
          textAnchor="middle"
          alignmentBaseline="baseline"
          dominantBaseline="baseline"
        >
          {text}
        </text>
      </g>
    </svg>
  );
};
