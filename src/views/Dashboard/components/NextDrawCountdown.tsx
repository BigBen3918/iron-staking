import intervalToDuration from 'date-fns/intervalToDuration';
import React, { useCallback, useEffect, useState } from 'react';
import useInterval from 'src/hooks/useInterval';
import styled from 'styled-components';

export type NextDrawCountdownProps = {
  to: Date;
};

const NextDrawCountdown: React.FC<NextDrawCountdownProps> = ({ to }) => {
  const [value, setValue] = useState({ h: '--', m: '--', s: '--' });
  const update = useCallback(() => {
    const now = new Date();

    if (to < now) {
      setValue({
        h: '00',
        m: '00',
        s: '00',
      });
      return;
    }

    if (to) {
      const duration = intervalToDuration({
        start: now,
        end: to,
      });

      setValue({
        h: padNumber((duration?.days || 0) * 24 + duration.hours),
        m: padNumber(duration.minutes),
        s: padNumber(duration.seconds),
      });
    }
  }, [to]);
  useEffect(() => update(), [update]);
  useInterval(update, 1000);

  return (
    <StyledContainer>
      {value.h} : {value.m} : {value.s}
    </StyledContainer>
  );
};

const padNumber = (s: number, length = 2, char = '0') => {
  const str = s.toString();
  return str.length >= length ? str : char.repeat(length - str.length) + str;
};

const StyledContainer = styled.div`
  margin-left: auto;
  font-size: 14px;
  font-weight: 500;
  color: #ffffff;
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: 12px;
  }
`;

export default NextDrawCountdown;
