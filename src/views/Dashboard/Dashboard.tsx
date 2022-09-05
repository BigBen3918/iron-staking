import React from 'react';
import Container from 'src/components/Container';
import Spacer from 'src/components/Spacer';
import styled from 'styled-components';
import Page from '../../components/Page';
import CollateralInfo from './components/CollateralInfo';
import DashboardInfo from './components/DashboardInfo';
import EcosystemInfo from './components/EcosystemInfo';

const Dashboard: React.FC = () => {
  return (
    <Page home={true}>
      <Container size="lg">
        <DashboardInfo />
        <CollateralInfo />
        <EcosystemInfo />
        <Spacer size="lg" />
      </Container>
    </Page>
  );
};

export const StyledGrid = styled.div`
  margin-top: 18px;
  display: grid;
  grid-gap: 18px;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(2, 1fr);
  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    display: block;
  }
`;

type StyledGridItemProps = {
  col: [number, number];
  row: [number, number];
};

export const StyledGridItem = styled.div<StyledGridItemProps>`
  grid-column-start: ${(p) => p.col[0]};
  grid-column-end: ${(p) => p.col[1]};
  grid-row-start: ${(p) => p.row[0]};
  grid-row-end: ${(p) => p.row[1]};
  border-radius: 10px;
  background-image: linear-gradient(to right, rgb(34 59 231 / 9%), rgb(52 67 249 / 15%));
  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    margin-top: 18px;
  }
`;

export default Dashboard;
