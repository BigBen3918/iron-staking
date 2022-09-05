import { useRef, useEffect } from 'react';

// eslint-disable-next-line @typescript-eslint/ban-types
export const useDelay = (callback: Function, delay: number) => {
  // eslint-disable-next-line @typescript-eslint/ban-types
  const savedCallback = useRef<Function>();

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    function tick() {
      savedCallback.current();
    }

    if (delay !== null && delay >= 0) {
      const id = setTimeout(tick, delay);
      return () => clearTimeout(id);
    }
  }, [delay]);
};

export const usePolling = (callback: () => Promise<void>, delay: number) => {
  const savedCallback = useRef<() => Promise<void>>();

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    let timeout: any;
    function tick() {
      return savedCallback
        .current()
        .then(() => {
          timeout = setTimeout(tick, delay);
        })
        .catch((e) => {
          console.warn('Polling error. Retry after', delay / 1000, 'seconds', e);
          timeout = setTimeout(tick, delay);
        });
    }

    tick();

    return () => {
      clearTimeout(timeout);
    };
  }, [delay]);
};
