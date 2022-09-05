import React, { useContext } from 'react';
import styled, { ThemeContext } from 'styled-components';
import bgDisclaimer from '../../assets/img/bg-disclaimer.jpg';
import { useAcceptTerms, useIsAcceptedTerms } from '../../state/application/hooks';

const Disclaimer: React.FC = () => {
  const { siteWidth } = useContext(ThemeContext);
  const isAcceptedTerms = useIsAcceptedTerms();
  const acceptTerms = useAcceptTerms();

  return (
    <>
      {!isAcceptedTerms && (
        <StyledDisclaimer>
          <DisclaimerContainer width={siteWidth}>
            <DisclaimerText>
              This software was audited. However, we highly recommend you to Do Your Own
              Research and never use funds within the Iron protocol that you cannot afford to
              lose. You won’t be compensated for any losses. All interactions with the
              associated smart contracts on Polygon network and software on iron.finance are at
              your own risk.
            </DisclaimerText>
            <DisclaimerButton onClick={acceptTerms}>Accept</DisclaimerButton>
          </DisclaimerContainer>
        </StyledDisclaimer>
      )}
    </>
  );
};

const StyledDisclaimer = styled.div`
  background-image: url(${bgDisclaimer});
  background-size: cover;
  background-position: center;
  padding: 20px 0px 30px;
  font-size: 0.9rem;
  display: flex;
  justify-content: center;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  box-shadow: 0 2px 3px 2px rgba(10, 10, 10, 0.2);
  z-index: 100;
`;

const DisclaimerContainer = styled.div<{ width: number }>`
  max-width: ${({ width }) => `${width}px`};
  display: flex;
  padding: 0 20px;
  align-items: center;
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;
const DisclaimerText = styled.div`
  padding-right: 20px;
  @media (max-width: 768px) {
    padding-right: 0;
    margin-bottom: 20px;
  }
`;
const DisclaimerButton = styled.button`
  margin-left: auto;
  align-items: center;
  background-color: transparent;
  border: 0;
  border-radius: 8px;
  color: ${(props) => props.theme.color.primary.main};
  border: solid 1px ${(props) => props.theme.color.primary.main};
  cursor: pointer;
  display: flex;
  font-size: 16px;
  font-weight: 700;
  height: 40px;
  justify-content: center;
  outline: none;
  padding-left: ${(props) => props.theme.spacing[6]}px;
  padding-right: ${(props) => props.theme.spacing[6]}px;
  transition: ease-in-out 100ms;
  &:hover {
    background-color: ${(props) => props.theme.color.primary.main};
    color: ${(props) => props.theme.color.white};
  }
`;

export default Disclaimer;
