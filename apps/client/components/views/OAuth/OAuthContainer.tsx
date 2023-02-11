import { Center, Spinner, Text, VStack } from '@chakra-ui/react';
import { css, useTheme } from '@emotion/react';

const OAuthContainer = () => {
  const { typography } = useTheme();

  return (
    <Center
      css={css`
        width: 100%;
        height: 100vh;
      `}
    >
      <VStack>
        <Text
          css={css`
            ${typography.headline4}
          `}
        >
          로그인 중
        </Text>
        <Text>환경에 따라 시간이 소요될 수 있습니다.</Text>
        <Spinner
          css={css`
            width: 3rem;
            height: 3rem;
          `}
        />
      </VStack>
    </Center>
  );
};

export default OAuthContainer;
