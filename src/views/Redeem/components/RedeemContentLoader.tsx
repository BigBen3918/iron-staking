import React, { useMemo } from 'react';
import ContentLoader from 'react-content-loader';
import Card from '../../../components/Card';
import { CardFooter } from '../../../components/CardFooter';
import {
  FormRowContentLoader,
  SubmitButtonContentLoader,
} from '../../../components/ContentLoader';
import { FormSeparator } from '../../../components/Form';
import theme from '../../../theme';

export const RedeemContentLoader: React.FC = () => {
  return (
    <>
      <Card width="450px">
        <FormRowContentLoader />
        <FormSeparator>
          <i className="fas fa-arrow-down" color={theme.color.primary.main}></i>
        </FormSeparator>
        <FormRowContentLoader />
        <FormSeparator>
          <i className="fas fa-plus" color={theme.color.secondary}></i>
        </FormSeparator>
        <FormRowContentLoader />
        <SubmitButtonContentLoader />
      </Card>
      <RedeemFooterContentLoader showFee />
    </>
  );
};

export interface FooterProps {
  showFee?: boolean;
}

export const RedeemFooterContentLoader: React.FC<FooterProps> = (props?: FooterProps) => {
  const spaceY = useMemo(() => {
    return props?.showFee ? 0 : 20;
  }, [props?.showFee]);
  return (
    <CardFooter width="400px">
      <ContentLoader
        height={70}
        speed={1}
        backgroundColor={'#101325'}
        foregroundColor={'#383e4b'}
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
