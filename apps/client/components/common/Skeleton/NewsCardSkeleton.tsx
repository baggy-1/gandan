import { Box } from '@chakra-ui/react';
import { css, useTheme } from '@emotion/react';

const NewsCardSkeleton = () => {
  const { colors } = useTheme();

  return (
    <Box
      css={css`
        width: 10rem;
        height: 12rem;
        background-color: ${colors.grayE8};
        border-radius: 0.5rem;
        position: relative;
        overflow: hidden;
      `}
    >
      <Box
        css={css`
          position: absolute;
          left: 0;
          bottom: 0;
          width: 100%;
          height: 4rem;
          background-color: rgba(0, 0, 0, 0.3);
        `}
      />
    </Box>
  );
};

export default NewsCardSkeleton;
