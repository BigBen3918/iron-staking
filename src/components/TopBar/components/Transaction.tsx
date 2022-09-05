import React from 'react';
import styled from 'styled-components';
import { TransactionDetails } from '../../../state/transactions/reducer';
import { RowFixed } from '../../Row';
import theme from '../../../theme';
import { useConfiguration } from '../../../contexts/ConfigProvider/ConfigProvider';

interface TransactionProps {
  tx: TransactionDetails;
}

const Transaction: React.FC<TransactionProps> = ({ tx }) => {
  const summary = tx.summary;
  const pending = !tx.receipt;
  const success =
    !pending && tx && (tx.receipt?.status === 1 || typeof tx.receipt?.status === 'undefined');
  const config = useConfiguration();

  return (
    <TransactionWrapper>
      <TransactionState
        href={`${config.etherscanUrl}/tx/${tx.hash}`}
        target="_blank"
        rel="noopener noreferrer"
        pending={pending}
        success={success}
      >
        <RowFixed>
          <TransactionStatusText>{summary ?? tx.hash} ↗</TransactionStatusText>
        </RowFixed>
        <IconWrapper pending={pending} success={success}>
          {pending ? (
            <i className="fas fa-circle-notch fa-spin"></i>
          ) : success ? (
            <i
              className="fas fa-check-circle"
              style={{ color: theme.color.success, fontSize: '16px' }}
            />
          ) : (
            <i
              className="fas fa-exclamation-circle"
              style={{ color: theme.color.danger, fontSize: '16px' }}
            />
          )}
        </IconWrapper>
      </TransactionState>
    </TransactionWrapper>
  );
};

const TransactionWrapper = styled.div`
  display: flex;
  height: 20px;
  margin-bottom: 8px;
  &:last-child {
    border-bottom: none;
  }
`;

const TransactionStatusText = styled.div`
  margin-right: 0.5rem;
  display: flex;
  font-size: 13px;
  color: ${(props) => props.theme.color.white};
  align-items: center;
  :hover {
    color: ${(props) => props.theme.color.primary.main};
  }
`;

const TransactionState = styled.a<{ pending: boolean; success?: boolean }>`
  flex: 1;
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-decoration: none !important;
  border-radius: 0.5rem;
  padding: 0.25rem 0rem;
  font-weight: 500;
  font-size: 0.825rem;
  color: ${(props) => props.theme.color.grey[400]};
`;

const IconWrapper = styled.div<{ pending: boolean; success?: boolean }>`
  color: ${({ pending, success, theme }) =>
    pending ? theme.color.primary : success ? theme.color.green[500] : theme.color.red[100]};
`;

export default Transaction;
