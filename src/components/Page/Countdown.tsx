import React, { useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';

interface RemainingTime {
  days?: number;
  hours?: number;
  minutes?: number;
  seconds?: number;
}

const Countdown: React.FC = () => {
  const launchDate = new Date(1615028400 * 1000).getTime();
  const [distance, setDistance] = useState(0);
  const remaining: RemainingTime = useMemo(() => {
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);
    return {
      days,
      hours,
      minutes,
      seconds,
    };
  }, [distance]);

  useEffect(() => {
    let mounted = true;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let interval: any = undefined;
    if (mounted) {
      interval = setInterval(() => {
        const now = new Date().getTime();
        setDistance(launchDate - now);
      });
    }
    return () => {
      mounted = false;
      if (interval) {
        clearInterval(interval);
      }
    };
  });

  return (
    distance > 0 && (
      <ClockContainer>
        <div className="clock">
          <div className="clock-desc">
            <i className="fas fa-stopwatch"></i>
            Launch time:&nbsp; <span className="primary"> March 06, 2021 - 11:00 UTC </span>
          </div>
          <div className="clock-time">
            <div className="clock-time-frag">
              <div className="clock-time-frag-number" id="day">
                {remaining?.days}
              </div>
              <div className="clock-time-frag-desc">Days</div>
            </div>
            <div className="clock-time-separator">:</div>
            <div className="clock-time-frag">
              <div className="clock-time-frag-number" id="hour">
                {remaining?.hours}
              </div>
              <div className="clock-time-frag-desc">Hours</div>
            </div>
            <div className="clock-time-separator">:</div>
            <div className="clock-time-frag">
              <div className="clock-time-frag-number" id="minute">
                {remaining?.minutes}
              </div>
              <div className="clock-time-frag-desc">Minutes</div>
            </div>
            <div className="clock-time-separator">:</div>
            <div className="clock-time-frag">
              <div className="clock-time-frag-number" id="second">
                {remaining?.seconds}
              </div>
              <div className="clock-time-frag-desc">Seconds</div>
            </div>
          </div>
        </div>
      </ClockContainer>
    )
  );
};

const ClockContainer = styled.div`
  display: flex;
  align-self: center;
  align-items: center;
  justify-content: center;
  margin-right: auto;
  margin-left: auto;
`;

export default Countdown;
