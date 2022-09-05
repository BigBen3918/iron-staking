import React from 'react';
import styled from 'styled-components';
import Container from '../Container';
import TopBar from '../TopBar';

interface PageProps {
  home?: boolean;
  full?: boolean;
  isHideFooter?: boolean;
}

const Page: React.FC<PageProps> = ({ children, full, home }) => {
  return (
    <StyledPage full={full}>
      <TopBar home={home} />
      {full ? (
        <StyledFullPage>{children}</StyledFullPage>
      ) : home ? (
        <Container size="homepage">{children}</Container>
      ) : (
        <Container size={'lg'}>
          <StyledMain>{children}</StyledMain>
        </Container>
      )}

      {/* {home && !isHideFooter && <Footer />} */}
    </StyledPage>
  );
};

const StyledPage = styled.div<{ home?: boolean; full?: boolean }>`
  min-height: ${({ full }) => (full ? '100vh' : 'auto')};
`;

const StyledFullPage = styled.div`
  flex: 1;
`;

const StyledMain = styled.div`
  min-height: calc(100vh - ${(props) => props.theme.topBarSize * 2}px);
  padding-bottom: ${(props) => props.theme.spacing[5]}px;
`;

export default Page;
