import { useState, useCallback, useEffect } from 'react';
import useInterval from 'src/hooks/useInterval';
import styled from 'styled-components';

export const ProgressBar: React.FC<{ to: Date; length: number }> = ({ to, length }) => {
  const [width, setWidth] = useState('0%');

  const update = useCallback(() => {
    if (length && to) {
      const now = Date.now();
      const value = +to < now ? 100 : (length * 1000 - +to + now) / 10 / length;
      setWidth(value.toFixed(2) + '%');
    }
  }, [length, to]);

  useEffect(() => update(), [update]);
  useInterval(update, length * 10);

  return (
    <StyledProgressTrack>
      <StyledProgressBar style={{ width }} />
    </StyledProgressTrack>
  );
};

const StyledProgressTrack = styled.div`
  height: 100%;
  width: 100%;
  background: linear-gradient(to right, rgb(34 59 231 / 9%), rgb(52 67 249 / 15%));
  position: relative;
`;

const StyledProgressBar = styled.div`
  position: absolute;
  background-image: linear-gradient(100deg, #ff531f -21%, #ff9a18 94%);
  height: 100%;
`;
