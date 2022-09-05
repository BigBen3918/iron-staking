import styled from 'styled-components';

export const StyledAlert = styled.div`
  padding-bottom: 50px;
  text-align: center;
  color: #dddd;
`;

export const WrongNetworkHint: React.FC = () => {
  return <StyledAlert>Connect to another network to use this function</StyledAlert>;
};
