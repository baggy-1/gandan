import { PropsWithChildren } from 'react';
import { VStack } from '@chakra-ui/react';
import Nav from './Nav';

const AppLayout = ({ children }: PropsWithChildren) => {
  return (
    <VStack>
      <Nav />
      <main>{children}</main>
    </VStack>
  );
};

export default AppLayout;
