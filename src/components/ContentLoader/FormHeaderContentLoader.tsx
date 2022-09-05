import ContentLoader from 'react-content-loader';
import styled from 'styled-components';

export const FormHeaderContentLoader: React.FC = () => {
  return (
    <FormHeaderContentLoaderWapper width="640">
      <ContentLoader
        height={130}
        speed={1}
        backgroundColor={'#333'}
        foregroundColor={'#999'}
        viewBox="0 0 640 130"
      >
        <rect x={20} y={0} width={80} height={25} />
        <rect x={20} y={40} width={550} height={50} />
        <rect x={20} y={110} width={200} height={18} />
      </ContentLoader>
    </FormHeaderContentLoaderWapper>
  );
};

export const FormHeaderContentLoaderWapper = styled.div<{ width?: string }>`
  margin-bottom: 30px;
  border-radius: 16px;
  color: #ddd;
  width: 100%;
  max-width: ${({ width }) => width || '640px'};
  font-size: 0.9rem;
  padding-top: calc(16px);
  padding-bottom: 20px;
  color: rgb(195, 197, 203);
  background-color: #1c1e2c;
  z-index: 1;
  transform: translateY(0%);
  transition: transform 300ms ease-in-out 0s;
`;
