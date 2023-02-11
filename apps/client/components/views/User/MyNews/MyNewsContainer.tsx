import { Suspense } from 'react';
import Grid from '~/components/common/Grid';

const MyNewsContainer = () => {
  return <Grid />;
};

const SuspenseMyNewsContainer = () => {
  return (
    <Suspense fallback={<div>로딩중...</div>}>
      <MyNewsContainer />
    </Suspense>
  );
};

export default SuspenseMyNewsContainer;
