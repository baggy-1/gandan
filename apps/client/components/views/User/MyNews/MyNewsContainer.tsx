import { Suspense } from 'react';

const MyNewsContainer = () => {
  return <div>저장한 뉴스</div>;
};

const SuspenseMyNewsContainer = () => {
  return (
    <Suspense fallback={<div>로딩중...</div>}>
      <MyNewsContainer />
    </Suspense>
  );
};

export default SuspenseMyNewsContainer;
