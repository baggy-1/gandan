import { PropsWithChildren } from 'react';
import { VStack, Container } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { css } from '@emotion/react';
import Nav from './Nav';
import LoginNav from './LoginNav';
import TopicNav from './TopicNav';

const AppLayout = ({ children }: PropsWithChildren) => {
  const { pathname } = useRouter();
  const { showTopicNav } = getRouterState(pathname);

  return (
    <VStack>
      {pathname === '/login' ? <LoginNav /> : <Nav />}
      <Container
        css={css`
          width: 100%;
          max-width: 96rem;
        `}
      >
        {showTopicNav && <TopicNav />}
        <main>{children}</main>
      </Container>
    </VStack>
  );
};

const getRouterState = (pathname: string) => {
  const topicNavRoutes = ['/news/topics/[topic]', '/news/[id]', '/'];

  return {
    showTopicNav: topicNavRoutes.includes(pathname),
  };
};

export default AppLayout;
