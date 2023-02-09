import { Center, Spinner } from '@chakra-ui/react';
import { css } from '@emotion/react';

const OAuthContainer = () => {
  return (
    <Center
      css={css`
        width: 100%;
        height: 100vh;
      `}
    >
      <Spinner
        css={css`
          width: 3rem;
          height: 3rem;
        `}
      />
    </Center>
  );
};

export default OAuthContainer;
