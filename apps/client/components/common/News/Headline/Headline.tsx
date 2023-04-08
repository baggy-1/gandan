import { Box, Card, Flex } from '@chakra-ui/react';
import Link from 'next/link';
import { useTheme, css } from '@emotion/react';
import { CursorArrow } from '~/assets/svgs/common';

interface Props {
  headline: Headline;
  titleFontSize?: 'default' | 'large';
}

const Headline = ({ headline, titleFontSize = 'default' }: Props) => {
  const { link, press, title } = headline;
  const { typography, colors } = useTheme();

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
                max-width: 80%;
                overflow-x: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
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
              ${TitleFont(titleFontSize)}
            `}
          >
            {title}
          </span>
        </Flex>
      </Card>
    </Link>
  );
};

const TitleFont = (titleFontSize: 'default' | 'large') => {
  const { typography } = useTheme();

  switch (titleFontSize) {
    case 'large':
      return css`
        ${typography.headline4}
      `;
    default:
      return css`
        ${typography.headline6}
      `;
  }
};

export default Headline;
