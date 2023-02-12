import { Box, VStack } from '@chakra-ui/react';
import { css, useTheme } from '@emotion/react';
import { ToastProps } from '../toast.types';

const Toast = ({
  id,
  title,
  description,
  isClosed,
  isClosable,
  onClose,
  onRequestRemove,
}: ToastProps) => {
  const { keyframes } = useTheme();

  return (
    <Box
      id={id}
      css={css`
        width: 100%;
        min-height: 3rem;
        background-color: #e2e2e2;
        animation: ${isClosed ? keyframes.scaleOut : keyframes.bottomIn} 0.3s
          ease-in-out;
      `}
      onAnimationEnd={isClosed ? onRequestRemove : undefined}
      onClick={isClosable ? onClose : undefined}
    >
      <VStack>
        <span>{title}</span>
        {description && <span>{description}</span>}
      </VStack>
    </Box>
  );
};

export default Toast;
