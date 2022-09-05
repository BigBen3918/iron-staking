import styled from 'styled-components';

export const FadeAnimated = styled.div`
  animation: fadeIn 0.3s;
  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  /* Firefox < 16 */
  @-moz-keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  /* Safari, Chrome and Opera > 12.1 */
  @-webkit-keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  /* Internet Explorer */
  @-ms-keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

export const Form = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  min-height: calc(100vh - ${(props) => props.theme.topBarSize * 2}px);
  padding-top: ${(props) => props.theme.spacing[5]}px;
  padding-bottom: ${(props) => props.theme.spacing[3]}px;
  position: relative;
  @media (max-width: 768px) {
    width: 100%;
  }
`;

export const FormRow = styled.div<{ disabled?: boolean }>`
  margin: 5px 0;
  border-radius: 15px;
  border: 1px solid #34383f;
  background-color: ${({ theme, disabled }) =>
    disabled ? `${theme.color.grey[800]}55` : 'transparent'};
  padding: 10px 15px;
  .row-header {
    display: flex;
    align-items: center;
    padding-bottom: 0px;
    margin-bottom: 10px;
    color: #8f929a;
    font-size: 14px;
    font-weight: normal;
    h6 {
      color: #8f929a;
      margin: 0;
      font-size: 14px;
      font-weight: normal;
    }
  }
  .row-input {
    display: flex;
    align-items: center;
    > :first-child {
      flex: 1;
    }
  }
  .row-footer {
    margin-top: 5px;
    text-align: right;
    a {
      color: ${(props) => props.theme.color.primary.main};
      text-decoration: none;
      font-size: 0.75rem;
      &:hover {
        color: ${(props) => props.theme.color.primary.light};
      }
    }
  }
`;

export const FormHeaderContainer = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
`;

export const FormHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
`;

export const FormAction = styled.div`
  margin-left: auto;
`;

export const FormHelper = styled.button`
  margin-top: 0px;
  margin-left: 5px;
  cursor: pointer;
  appearance: none;
  border: none;
  height: auto;
  background: none;
  font-size: 1rem;
  color: ${(props) => props.theme.color.grey[400]};
  padding: 3px;
  height: 1rem;
  line-height: 1;
  &:hover {
    color: ${(props) => props.theme.color.primary.main};
  }
`;

export const ButtonRefreshUnclaimed = styled.button`
  background-color: transparent;
  text-align: center;
  display: flex;
  align-items: center;
  color: ${(props) => props.theme.color.primary.main};
  border-radius: 14px;
  height: 28px;
  margin-top: 5px;
  margin-right: -5px;
  border: none;
  font-weight: 500;
  cursor: pointer;
  transition: ease-in-out 150ms;
  &:hover {
    background-color: ${(props) => props.theme.color.primary.main};
    color: ${(props) => props.theme.color.white};
  }
`;

export const ButtonRefreshUnclaimedContent = styled.div`
  margin: 0 4px;
`;

export const FormTitle = styled.h4`
  color: ${(props) => props.theme.color.white};
  font-size: 24px;
  font-weight: 500;
  margin: 0;
  padding: 0;
  text-transform: uppercase;
`;

export const FormSeparator = styled.div`
  padding: 10px 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const FormToken = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  font-size: 16px;
  font-weight: 500;
  width: 120px;
  color: ${(props) => props.theme.color.white};
  margin-left: 5px;
  span {
    margin-left: 10px;
  }
`;

export const FormOutput = styled.div`
  color: ${(props) => props.theme.color.success};
  width: 0px;
  position: relative;
  font-weight: 500;
  outline: none;
  border: none;
  flex: 1 1 auto;
  font-size: 24px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  padding: 0px;
  font-weight: 500;
`;

export const FormButtonsContainer = styled.div`
  margin-top: 30px;
`;
