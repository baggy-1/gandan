import { Box, Card, Flex } from '@chakra-ui/react';
import Link from 'next/link';
import { useTheme, css } from '@emotion/react';
import { CursorArrow } from '~/assets/svgs/common';
import { useNewsDetail } from '~/components/views/NewsDetail/NewsDetailContainer';

interface Props {
  headline: Headline;
}

const Headline = ({ headline }: Props) => {
  const { link, press, title } = headline;
  const { typography, colors } = useTheme();
  const { isFontSizeLarge } = useNewsDetail();

  return (
    <Link href={link}>
      <Card>
        <Flex
          css={css`
            gap: 0.5rem;
            flex-direction: column;
          `}
        >
          <Flex>
            <Box
              css={css`
                width: fit-content;
                padding: 0.25rem;
                border: 1px solid ${colors.grayE8};
                border-radius: 0.25rem;
                background-color: ${colors.grayE8};
              `}
            >
              <span
                css={css`
                  ${typography.button}
                `}
              >
                {press}
              </span>
            </Box>
            <CursorArrow width="1.5rem" height="1.5rem" />
          </Flex>
          <span
            css={css`
              ${isFontSizeLarge ? typography.headline4 : typography.headline6}
            `}
          >
            {title}
          </span>
        </Flex>
      </Card>
    </Link>
  );
};

export default Headline;
