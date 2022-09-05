import styled from 'styled-components';
import { useBlockNumber } from '../../../state/application/hooks';

export const BlockNumber: React.FC = () => {
  const blockNumber = useBlockNumber();

  return (
    <StyledIndicator>
      #&nbsp;
      {blockNumber}
    </StyledIndicator>
  );
};

const StyledIndicator = styled.div`
  position: fixed;
  bottom: 0;
  right: 0;
  padding: 10px;
  font-size: 0.7em;
  color: #00be44;
  opacity: 0.8;
  font-weight: bold;
  text-shadow: 0px 0px 3px #00be44;
`;
