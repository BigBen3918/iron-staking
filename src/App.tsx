import React from 'react';
import { Route, BrowserRouter as Router, Switch, Redirect } from 'react-router-dom';
import styled, { ThemeProvider } from 'styled-components';
import Popups from './components/Popups';
import Updaters from './state/Updaters';
import theme from './theme';
import store from './state';
import { Provider } from 'react-redux';
import ModalsProvider from './contexts/Modals';
import { DynamicWalletProvider } from './contexts/DynamicWalletProvider/DynamicWalletProvider';
import Disclaimer from './components/Disclaimer';
import MainWrapper from './MainWrapper';
import Sidebar from './components/Sidebar';
import loadable from '@loadable/component';
import bgSite from './assets/img/bg-site.png';
import { UseWalletProvider } from 'use-wallet';
import BlockchainProvider from './contexts/blockchainProvider';
const Dashboard = loadable(() => import('./views/Dashboard'));
const Bank = loadable(() => import('./views/Bank'));
const Farms = loadable(() => import('./views/Farms'));

const App: React.FC = () => {
  return (
    <Providers>
      <StyledSite>
        <Router>
          <StyledSidebarContainer>
            <Sidebar />
          </StyledSidebarContainer>
          <MainWrapper>
            <Switch>
              <Route path="/" exact>
                <Farms />
              </Route>
              <Route path="/mint">
                <Redirect to="/bank?action=mint" />
              </Route>
              <Route path="/redeem">
                <Redirect to="/bank?action=redeem" />
              </Route>
              <Route path="/bank">
                <Bank />
              </Route>
              <Route path="/staking">
                <Redirect to="/farms" />
              </Route>
              <Route path="/farms">
                <Farms />
              </Route>
              <Redirect to="/" />
            </Switch>
            <Disclaimer />
          </MainWrapper>
        </Router>
      </StyledSite>
    </Providers>
  );
};

const Providers: React.FC = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <UseWalletProvider
        connectors={{
          walletconnect: {
            rpc: {
              1: 'https://main-light.eth.linkpool.io/',
              3: 'https://rpc-url',
              4002: 'https://ftm-test.babylonswap.finance',
            },
          },
          portis: { dAppId: 'my-dapp-123-xyz' },
        }}
      >
        {/* <ConnectionProvider> */}
        <BlockchainProvider>
          <DynamicWalletProvider>
            <Provider store={store}>
              <Updaters />
              <ModalsProvider>
                <>
                  <Popups />
                  {children}
                  <Disclaimer />
                </>
              </ModalsProvider>
            </Provider>
          </DynamicWalletProvider>
        </BlockchainProvider>
      </UseWalletProvider>
      {/* </ConnectionProvider> */}
    </ThemeProvider>
  );
};

const StyledSite = styled.div`
  &::before {
    background-image: url(${bgSite});
    background-repeat: no-repeat;
    background-position: center top;
    background-size: cover;
    content: '';
    height: 30%;
    left: 0;
    position: fixed;
    bottom: 0;
    width: 100%;
    will-change: transform;
    z-index: -1;
  }
`;

const StyledSidebarContainer = styled.div`
  border-right: solid 1px #201d2f;
  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    width: 250px;
  }
  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    border-right: none;
  }
`;

export default App;
