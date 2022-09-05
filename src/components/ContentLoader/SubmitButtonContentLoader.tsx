import ContentLoader from 'react-content-loader';

export const SubmitButtonContentLoader: React.FC = () => {
  return (
    <ContentLoader
      height={70}
      speed={1}
      backgroundColor={'#101325'}
      foregroundColor={'#383e4b'}
      viewBox="0 0 380 70"
    >
      <rect x={30} y={20} rx={'5'} ry={'5'} width="350" height={42} />
    </ContentLoader>
  );
};
