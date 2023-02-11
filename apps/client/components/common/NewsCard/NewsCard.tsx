import { Box, Flex, Text } from '@chakra-ui/react';
import { css, useTheme } from '@emotion/react';
import Image from 'next/image';
import { useRouter } from 'next/router';

type Props = Pick<News, 'id' | 'title' | 'thumbnail'>;

const NewsCard = ({ id, title, thumbnail }: Props) => {
  const { push } = useRouter();
  const { typography, colors } = useTheme();

  return (
    <Box
      css={css`
        cursor: pointer;
      `}
      onClick={() => push(`/news/${id}`)}
    >
      <Box
        css={css`
          position: relative;
          width: 10rem;
          height: 12rem;
          border-radius: 0.5rem;
          overflow: hidden;
        `}
      >
        <Image
          src={thumbnail.sm}
          alt="news thumbnail"
          width={160}
          height={192}
        />
        <Flex
          css={css`
            position: absolute;
            left: 0;
            bottom: 0;
            width: 100%;
            height: 4rem;
            background-color: rgba(0, 0, 0, 0.5);
            flex-direction: column;
            justify-content: space-between;
            padding: 0.5rem;
          `}
        >
          <Text
            css={css`
              ${typography.body1}
              color: ${colors.white};
              text-align: center;
            `}
          >
            {title}
          </Text>
          <Text
            css={css`
              ${typography.body2}
              color: ${colors.white};
              text-align: center;
            `}
          >
            1분만에 보는 헤드라인
          </Text>
        </Flex>
      </Box>
    </Box>
  );
};

export default NewsCard;
