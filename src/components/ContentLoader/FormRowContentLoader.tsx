import ContentLoader from 'react-content-loader';
import { FormRow } from '../Form';

export const FormRowContentLoader: React.FC = () => {
  const xCollum1 = '0';
  const yCollum1 = '10';
  const yCollum2 = '40';
  const height2 = '20';
  const height1 = '10';
  return (
    <FormRow>
      <div className="row-header">
        <ContentLoader
          height={70}
          speed={1}
          backgroundColor={'#101325'}
          foregroundColor={'#383e4b'}
          viewBox="0 0 380 70"
        >
          <rect x={xCollum1} y={yCollum1} width="100" rx={'5'} ry={'5'} height={height1} />
          <rect x="330" y={yCollum1} rx={'5'} ry={'5'} width="60" height={height1} />
          <rect x={xCollum1} y={yCollum2} width="60" rx={'5'} ry={'5'} height={height2} />
          <rect x="240" rx={'5'} ry={'5'} y={yCollum2} width="40" height={height2} />
          <rect x="300" rx={'5'} ry={'5'} y={yCollum2} width="80" height={height2} />
        </ContentLoader>
      </div>
    </FormRow>
  );
};
