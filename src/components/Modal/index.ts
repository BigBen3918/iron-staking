import styled from 'styled-components';

export { default } from './Modal';
export type { ModalProps } from './Modal';

export const ModalUpper = styled.div`
  background-color: ${(props) => props.theme.color.blue[600]};
  padding: 20px 25px;
  display: grid;
  grid-auto-rows: auto;
  grid-template-rows: 1fr;
  grid-gap: 15px;
  border-bottom: dashed 1px ${(props) => props.theme.color.grey[800]};
`;

export const ModalCenter = styled.div`
  background-color: ${(props) => props.theme.color.blue[600]};
  border-bottom: dashed 1px ${(props) => props.theme.color.grey[800]};
`;

export const ModalContent = styled.div`
  background-color: ${(props) => props.theme.color.blue[600]};
  padding: 20px 25px;
`;

export const ModalLower = styled.div`
  background-color: ${(props) => props.theme.color.blue[800]};
  padding: 25px 25px;
  font-size: 15px;
`;

export const ModalHeader = styled.div<{ center?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: ${({ center }) => (center ? 'center' : 'flex-start')};
`;

export const ModalTitle = styled.div`
  font-size: 20px;
  color: ${(props) => props.theme.color.grey[200]};
  font-weight: 500;
`;

export const ModalTitleCentered = styled(ModalTitle)`
  text-align: center;
`;

export const ModalCloseButton = styled.div`
  margin-left: auto;
  display: flex;
  align-items: center;
`;
