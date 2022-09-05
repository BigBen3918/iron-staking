import React, { useMemo } from 'react';
import ContentLoader from 'react-content-loader';
import Card from '../../../components/Card';
import { CardFooter } from '../../../components/CardFooter';
import { FormRowContentLoader } from '../../../components/ContentLoader';
import { SubmitButtonContentLoader } from '../../../components/ContentLoader/SubmitButtonContentLoader';
import { FormSeparator } from '../../../components/Form';
import theme from '../../../theme';

export const MintContentLoader: React.FC = () => {
  return (
    <>
      <Card width="450px">
        <FormRowContentLoader />
        <FormSeparator>
          <i className="fas fa-arrow-down" color={theme.color.primary.main} />
        </FormSeparator>
        <FormRowContentLoader />
        <SubmitButtonContentLoader />
      </Card>
      <MintFootterContentLoader showFee />
    </>
  );
};

export interface MintFootterContentLoaderProps {
  showFee?: boolean;
}

export const MintFootterContentLoader: React.FC<MintFootterContentLoaderProps> = (props) => {
  const spaceY = useMemo(() => {
    return props?.showFee ? 0 : 20;
  }, [props?.showFee]);
  return (
    <CardFooter width="400px">
      <ContentLoader
        height={70}
        speed={1}
        backgroundColor={'#151724'}
        foregroundColor={'#424870dd'}
        viewBox="0 0 400 70"
      >
        {props?.showFee ? (
          <>
            <rect x={20} y={0} width="60" height={10} />
            <rect x={330} y={0} width="50" height={10} />
          </>
        ) : undefined}
        <rect x={20} y={20 - spaceY} width="80" height={10} />
        <rect x={300} y={20 - spaceY} width="80" height={10} />
        <rect x={20} y={40 - spaceY} width="90" height={10} />
        <rect x={340} y={40 - spaceY} width="40" height={10} />
        <rect x={20} y={60 - spaceY} width="110" height={10} />
        <rect x={300} y={60 - spaceY} width="80" height={10} />
      </ContentLoader>
    </CardFooter>
  );
};
