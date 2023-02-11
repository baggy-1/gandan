import { Flex } from '@chakra-ui/react';
import { EmotionJSX } from '@emotion/react/types/jsx-namespace';
import { Suspense } from 'react';
import NewsList from '~/components/common/NewsList';
import { useQueryNews } from '~/services/client/news/queries';
import { NewsListSkeleton } from '~/components/common/Skeleton';

const HomeContainer = () => {
  const { data: newslist } = useQueryNews();

  return (
    <Flex>
      <NewsList newslist={newslist} />
    </Flex>
  );
};

const CreateNewsContainer = ({
  children,
}: {
  children: EmotionJSX.Element;
}) => {
  // const { date } = getKoreaDate(new Date());
  // const id = `${date}-@-news`;
  // useQueryNewsById(id);

  return <>{children}</>;
};

const SuspenseHomeContainer = () => {
  return (
    <Suspense fallback={<NewsListSkeleton />}>
      <CreateNewsContainer>
        <HomeContainer />
      </CreateNewsContainer>
    </Suspense>
  );
};

export default SuspenseHomeContainer;
