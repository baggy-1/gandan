import { PropsWithChildren } from 'react';
import { Box, Text, VStack } from '@chakra-ui/react';
import { useTheme, css } from '@emotion/react';

const AppLayout = ({ children }: PropsWithChildren) => {
  const { typography } = useTheme();

  return (
    <VStack>
      <Box>
        <Text
          css={css`
            ${typography.headline4}
          `}
        >
          GD News
        </Text>
      </Box>
      <main>{children}</main>
    </VStack>
  );
};

export default AppLayout;
