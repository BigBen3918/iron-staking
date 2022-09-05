import styled from 'styled-components';

export const TxModalOutputAmount = styled.div`
  font-size: 2.25em;
  line-height: 1;
  color: ${(props) => props.theme.color.success};
  font-family: ${(props) => props.theme.font.monospace};
  font-weight: 600;
`;

export const TxModalTokenName = styled.div`
  font-size: 1.4em;
  color: ${(props) => props.theme.color.grey[200]};
  font-weight: 500;
`;

export const TxModalSlippageHelper = styled.div`
  font-size: 12px;
  line-height: 1.5;
  color: ${(props) => props.theme.color.secondary};
`;

export const TxModalDataRow = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;
export const TxModalDataRowField = styled.div`
  color: ${(props) => props.theme.color.secondary};
`;
export const TxModalDataRowValue = styled.div`
  margin-left: auto;
`;

export const TxModalButtons = styled.div`
  margin-top: 20px;
`;
