import React from 'react';
import styled from 'styled-components';

import Card from '../Card';
import CardContent from '../CardContent';
import Container from '../Container';

export interface ModalProps {
  onDismiss?: () => void;
  size?: 'xs' | 'sm' | 'md' | 'lg';
  padding?: string;
  background?: string;
}

const Modal: React.FC<ModalProps> = ({ children, size, padding, background }) => {
  return (
    <Container size={size || 'sm'}>
      <StyledModal>
        <Card width="auto" padding={padding} background={background}>
          <CardContent>{children}</CardContent>
        </Card>
      </StyledModal>
    </Container>
  );
};

const StyledModal = styled.div`
  border-radius: 12px;
  box-shadow: 2px 2px 4px -2px ${(props) => props.theme.color.grey[900]};
  position: relative;
`;

export default Modal;
