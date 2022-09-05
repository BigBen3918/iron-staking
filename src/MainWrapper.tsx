import styled from 'styled-components';
import bgMain from './assets/img/bg-main.png';

const MainWrapper: React.FC = ({ children }) => {
  return <StyledMainContent>{children}</StyledMainContent>;
};

const StyledMainContent = styled.div`
  min-height: 100vh;
  margin-left: 250px;
  position: relative;

  &::before {
    background-image: url(${bgMain});
    background-repeat: no-repeat;
    background-position: center top;
    background-size: cover;
    content: '';
    height: 206px;
    width: 1005px;
    left: 0;
    position: fixed;
    top: 0;
    will-change: transform;
    z-index: -1;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    margin-left: 0;
  }
`;
export default MainWrapper;
