import { Box, Card, Flex } from '@chakra-ui/react';
import { css, useTheme } from '@emotion/react';

interface Props {
  textWidth?: string | number;
}

const Headline = ({ textWidth = '70%' }: Props) => {
  const { keyframes } = useTheme();

  return (
    <Card
      css={css`
        width: 100%;
        padding: 0 0.5rem;
        animation: ${keyframes.blink} 1.5s infinite;
      `}
    >
      <Flex
        css={css`
          gap: 0.5rem;
          flex-direction: column;
        `}
      >
        <Flex>
          <Box
            css={css`
              width: 4rem;
              height: 1.5rem;
              padding: 0.25rem;
              border-radius: 0.25rem;
              background-color: rgba(0, 0, 0, 0.2);
            `}
          />
        </Flex>
        <span
          css={css`
            width: ${textWidth};
            height: 2.5rem;
            background-color: rgba(0, 0, 0, 0.25);
          `}
        />
      </Flex>
    </Card>
  );
};

export default Headline;
