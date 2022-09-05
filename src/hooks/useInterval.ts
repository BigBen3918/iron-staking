import { useEffect, useRef } from 'react';

const useInterval = (callback: any, timer: number, ...args: any[]) => {
  const cbRef = useRef<() => void>();

  useEffect(() => {
    cbRef.current = callback;
  }, [callback]);

  useEffect(() => {
    function tick() {
      cbRef.current();
    }

    if (timer) {
      tick();
      const intervalId = setInterval(tick, timer);
      return () => clearInterval(intervalId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timer, ...args]);
};

export default useInterval;
