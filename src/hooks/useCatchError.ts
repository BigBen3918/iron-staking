import { useCallback } from 'react';
import { useAddPopup } from '../state/application/hooks';

const DEFAULT_ERROR_MSG = 'Unexpected error is occurred.';

function useCatchError(): (promise: Promise<any>, message?: string) => void {
  const addPopup = useAddPopup();

  return useCallback(
    (promise: Promise<any>, message = DEFAULT_ERROR_MSG) => {
      promise.catch((err) => {
        if (err.message.includes('User denied')) {
          // User denied transaction signature on MetaMask.
          return;
        }
        console.error(`Uncaught exception: ${err.stack}`);
        addPopup({ error: { title: 'Error', message } });
      });
    },
    [addPopup],
  );
}

export default useCatchError;
