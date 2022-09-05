import ContentLoader from 'react-content-loader';

interface TokenDisplayDataBoxContentLoaderProps {
  isSmallSize?: boolean;
}

export const TokenDisplayDataBoxContentLoader: React.FC<
  TokenDisplayDataBoxContentLoaderProps
> = ({ isSmallSize }) => {
  return (
    <ContentLoader
      height={isSmallSize ? 22 : 26}
      speed={1}
      backgroundColor={'#151724'}
      foregroundColor={'#424870'}
      viewBox="0 0 150 26"
    >
      <rect
        x={0}
        y={isSmallSize ? 4 : 0}
        rx={5}
        ry={5}
        width="150"
        height={isSmallSize ? 22 : 26}
      />
    </ContentLoader>
  );
};
