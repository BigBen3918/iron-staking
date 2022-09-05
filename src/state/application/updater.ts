import { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import useDebounce from '../../hooks/useDebounce';
import { updateBlockNumber } from './actions';
import useIsWindowVisible from 'src/hooks/useIsWindowVisible';
import { useWeb3React } from '@web3-react/core';

export default function Updater(): null {
  const dispatch = useDispatch();
  const isVisble = useIsWindowVisible();
  const { library: provider, chainId } = useWeb3React();
  const [state, setState] = useState<{
    chainId: number | undefined;
    blockNumber: number | null;
  }>({
    chainId,
    blockNumber: null,
  });

  const blockNumberCallback = useCallback(
    (blockNumber: number) => {
      if (isVisble) {
        setState((state) => {
          if (typeof state.blockNumber !== 'number') return { chainId, blockNumber };
          return { chainId, blockNumber: Math.max(blockNumber, state.blockNumber) };
        });
      }
    },
    [isVisble, chainId],
  );

  // attach/detach listeners
  useEffect(() => {
    if (!provider) {
      return undefined;
    }

    provider.on('block', blockNumberCallback);
    return () => provider.removeListener('block', blockNumberCallback);
  }, [blockNumberCallback, provider]);

  const debouncedState = useDebounce(state, 100);

  useEffect(() => {
    if (!debouncedState.chainId || !debouncedState.blockNumber) return;
    dispatch(
      updateBlockNumber({
        chainId: debouncedState.chainId,
        blockNumber: debouncedState.blockNumber,
      }),
    );
  }, [dispatch, debouncedState.blockNumber, debouncedState.chainId]);

  return null;
}
