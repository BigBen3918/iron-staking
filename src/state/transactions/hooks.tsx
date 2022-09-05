import { TransactionResponse } from '@ethersproject/providers';
import { useWeb3React } from '@web3-react/core';
import { useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { AppDispatch, AppState } from '../index';
import { addTransaction, clearAllTransactions } from './actions';
import { TransactionDetails } from './reducer';

export type TransactionCustomData = {
  summary?: string;
  approval?: { tokenAddress: string; spender: string };
  redemption?: { poolAddress: string };
  vault?: {
    lock?: string;
    claim?: string;
  };
};

// helper that can take a ethers library transaction response and add it to the list of transactions
export function useTransactionAdder(): (
  response: TransactionResponse,
  customData?: TransactionCustomData,
) => void {
  const { chainId, account } = useWeb3React();
  const dispatch = useDispatch<AppDispatch>();

  return useCallback(
    (
      response: TransactionResponse,
      { summary, approval, redemption }: TransactionCustomData = {},
    ) => {
      // if (!account) return;
      if (!chainId) return;

      const { hash } = response;
      if (!hash) {
        throw Error('No transaction hash found.');
      }
      dispatch(addTransaction({ hash, from: account, chainId, approval, summary, redemption }));
    },
    [dispatch, chainId, account],
  );
}

// returns all the transactions for the current chain
export function useAllTransactions(): { [txHash: string]: TransactionDetails } {
  const { chainId } = useWeb3React();
  const state = useSelector<AppState, AppState['transactions']>((state) => state.transactions);

  return chainId ? state[chainId] ?? {} : {};
}

export function useIsTransactionPending(transactionHash?: string): boolean {
  const transactions = useAllTransactions();
  if (!transactionHash || !transactions[transactionHash]) {
    return false;
  }
  return !transactions[transactionHash].receipt;
}

/**
 * Returns whether a transaction happened in the last day (86400 seconds * 1000 milliseconds / second)
 * @param tx to check for recency
 */
export function isTransactionRecent(tx: TransactionDetails): boolean {
  return new Date().getTime() - tx.addedTime < 86_400_000;
}

// returns whether a token has a pending approval transaction
export function useHasPendingApproval(
  tokenAddress: string | undefined,
  spender: string | undefined,
): boolean {
  const allTransactions = useAllTransactions();

  return useMemo(
    () =>
      typeof tokenAddress === 'string' &&
      typeof spender === 'string' &&
      Object.keys(allTransactions).some((hash) => {
        const tx = allTransactions[hash];
        if (!tx) return false;
        if (tx.receipt) {
          return false;
        } else {
          const approval = tx.approval;
          if (!approval) return false;
          return (
            approval.spender === spender &&
            approval.tokenAddress === tokenAddress &&
            isTransactionRecent(tx)
          );
        }
      }),
    [allTransactions, spender, tokenAddress],
  );
}

export function useHasPendingRedemption(poolAddress: string | undefined): boolean {
  const allTransactions = useAllTransactions();

  return useMemo(
    () =>
      typeof poolAddress === 'string' &&
      Object.keys(allTransactions).some((hash) => {
        const tx = allTransactions[hash];
        if (!tx || tx.receipt || !isTransactionRecent(tx)) {
          return false;
        }

        const { redemption } = tx;
        if (!redemption) {
          return false;
        }

        return redemption.poolAddress === poolAddress;
      }),
    [allTransactions, poolAddress],
  );
}

export function useClearAllTransactions(): { clearAllTransactions: () => void } {
  const { chainId } = useWeb3React();
  const dispatch = useDispatch<AppDispatch>();
  return {
    clearAllTransactions: useCallback(
      () => dispatch(clearAllTransactions({ chainId })),
      [chainId, dispatch],
    ),
  };
}
