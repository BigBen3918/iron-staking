import React, { useMemo } from 'react';
import Label from '../../Label';
import { TransactionDetails } from '../../../state/transactions/reducer';
import styled from 'styled-components';
import Transaction from './Transaction';
import {
  isTransactionRecent,
  useAllTransactions,
  useClearAllTransactions,
} from '../../../state/transactions/hooks';

const MAX_TRANSACTION_HISTORY = 10;

const AccountTransactions: React.FC = () => {
  const allTransactions = useAllTransactions();
  const { clearAllTransactions } = useClearAllTransactions();
  const sortedRecentTransactions = useMemo(() => {
    const txs = Object.values(allTransactions);
    return txs.filter(isTransactionRecent).sort(newTransactionsFirst);
  }, [allTransactions]);
  const pending = sortedRecentTransactions.filter((tx) => !tx.receipt);
  const confirmed = sortedRecentTransactions
    .filter((tx) => tx.receipt)
    .slice(0, MAX_TRANSACTION_HISTORY);

  const isEmpty = confirmed?.length + pending?.length == 0;
  return (
    <StyledTransactions>
      {isEmpty && (
        <LabelPadding>
          <Label text="Your transactions will appear here..." color="#ccc" />
        </LabelPadding>
      )}
      {!isEmpty && (
        <>
          <TransactionHeader>
            <TransactionTitle>Recent transactions</TransactionTitle>
            <StyledTransactionActions onClick={clearAllTransactions}>
              <i className="fas fa-trash-alt" style={{ fontSize: '13px' }}></i>
              <span style={{ marginLeft: '5px' }}>Clear all</span>
            </StyledTransactionActions>
          </TransactionHeader>

          <StyledTransactionList>
            {pending?.length > 0 && pending.map((tx) => <Transaction key={tx.hash} tx={tx} />)}
            {confirmed?.length > 0 &&
              confirmed.map((tx) => <Transaction key={tx.hash} tx={tx} />)}
          </StyledTransactionList>
        </>
      )}
    </StyledTransactions>
  );
};

const StyledTransactions = styled.div``;

const LabelPadding = styled.div`
  padding: 10px 0;
`;

const TransactionHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const TransactionTitle = styled.div`
  text-transform: uppercase;
  font-size: 14px;
  color: ${(props) => props.theme.color.secondary};
  font-weight: 600;
`;

const StyledTransactionList = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledTransactionActions = styled.button`
  margin-left: auto;
  background-color: transparent;
  border: none;
  cursor: pointer;
  font-size: 0.75rem;
  padding: 0;
  color: ${(props) => props.theme.color.secondary};
  &:hover {
    color: ${(props) => props.theme.color.primary.main};
  }
`;

// we want the latest one to come first, so return negative if a is after b
function newTransactionsFirst(a: TransactionDetails, b: TransactionDetails) {
  return b.addedTime - a.addedTime;
}

export default AccountTransactions;
