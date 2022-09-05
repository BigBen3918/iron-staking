import React from 'react';
import styled from 'styled-components';

const CardBody: React.FC = ({ children }) => {
  return <StyledCardBody>{children}</StyledCardBody>;
};

const StyledCardBody = styled.div`
  flex: 1 1 auto;
  min-height: 1px;
  padding: 0.25rem;
`;

export default CardBody;
