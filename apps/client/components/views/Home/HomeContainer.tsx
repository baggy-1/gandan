import { Flex } from '@chakra-ui/react';
import { Suspense } from 'react';
import NewsList from '~/components/common/NewsList';
import { useQueryNews } from '~/services/client/news/queries';

const HomeContainer = () => {
  const { data: newslist } = useQueryNews();

  return (
    <Flex>
      <NewsList newslist={newslist} />
    </Flex>
  );
};

const SuspenseHomeContainer = () => {
  return (
    <Suspense fallback={<div>로딩중...</div>}>
      <HomeContainer />
    </Suspense>
  );
};

export default SuspenseHomeContainer;
