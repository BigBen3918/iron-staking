import React, { useContext } from 'react';
import styled, { ThemeContext } from 'styled-components';
import { AutoColumn } from '../Column';
import { AutoRow } from '../Row';
import { useConfiguration } from '../../contexts/ConfigProvider/ConfigProvider';
import { useWeb3React } from '@web3-react/core';

interface TractionPopupProps {
  hash: string;
  success?: boolean;
  summary?: string;
}

const TransactionPopup: React.FC<TractionPopupProps> = ({ hash, success, summary }) => {
  const { chainId } = useWeb3React();
  const theme = useContext(ThemeContext);
  const config = useConfiguration();

  return (
    <RowNoFlex>
      <div style={{ paddingRight: 16 }}>
        {success ? (
          <i
            className="fas fa-check-circle"
            style={{ color: theme.color.success, fontSize: '24px' }}
          />
        ) : (
          <i
            className="fas fa-exclamation-circle"
            style={{ color: theme.color.danger, fontSize: '24px' }}
          />
        )}
      </div>
      <AutoColumn gap="8px">
        <StyledPopupDesc>
          {summary ?? 'Hash: ' + hash.slice(0, 8) + '...' + hash.slice(58, 65)}
        </StyledPopupDesc>
        {chainId && (
          <StyledLink
            target="_blank"
            rel="noopener noreferrer"
            href={`${config.etherscanUrl}/tx/${hash}`}
          >
            View on explorer
          </StyledLink>
        )}
      </AutoColumn>
    </RowNoFlex>
  );
};

const RowNoFlex = styled(AutoRow)`
  flex-wrap: nowrap;
`;

const StyledPopupDesc = styled.span`
  font-weight: 500;
  color: ${(props) => props.theme.color.grey[300]};
`;

const StyledLink = styled.a`
  color: ${(props) => props.theme.color.grey[500]};
`;

export default TransactionPopup;
