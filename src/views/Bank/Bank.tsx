import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Form } from 'src/components/Form';
import Page from 'src/components/Page';
import useQuery from 'src/hooks/useQuery';
import styled from 'styled-components';
import Mint from '../Mint';
import Redeem from '../Redeem';

type BankAction = 'mint' | 'redeem';

const Bank: React.FC = () => {
  const [action, setAction] = useState<BankAction>('mint');
  const history = useHistory();
  const query = useQuery();

  useEffect(() => {
    const action = query?.get('action');
    switch (action) {
      case 'mint':
      case 'redeem':
        setAction(action);
        break;
      default:
        history.push(`/bank?action=mint`);
        break;
    }
  }, [history, query]);

  const selectAction = (action: BankAction) => {
    setAction(action);
  };

  return (
    <Page>
      <Form>
        <StyledSwitch>
          <StyledSwitchItem active={action === 'mint'} onClick={() => selectAction('mint')}>
            Mint
          </StyledSwitchItem>
          <StyledSwitchItem active={action === 'redeem'} onClick={() => selectAction('redeem')}>
            Redeem
          </StyledSwitchItem>
        </StyledSwitch>
        {action === 'mint' ? <Mint /> : action === 'redeem' && <Redeem />}
      </Form>
    </Page>
  );
};

const StyledSwitch = styled.div`
  display: flex;
  align-items: center;
  border: solid 1px #383e4b;
  border-radius: 9px;
  overflow: hidden;
  margin-bottom: 30px;
  background-color: #0b0c17;
  padding: 3px;
`;

const StyledSwitchItem = styled.button<{ active?: boolean }>`
  border-radius: 6px;
  appearance: none;
  background-color: ${({ active }) => (!active ? 'transparent' : '#1a1d2f')};
  border: none;
  color: ${({ active, theme }) => (active ? theme.color.primary.main : theme.color.secondary)};
  text-transform: uppercase;
  font-weight: 600;
  width: 110px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: ease-in-out 150ms;
  font-size: 14px;
`;

export default Bank;
