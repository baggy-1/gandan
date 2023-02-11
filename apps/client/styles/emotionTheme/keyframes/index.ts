import { keyframes } from '@emotion/react';

const blink = keyframes`
    0% {
        opacity: 0.5;
    }
    50% {
        opacity: 1;
    }
    100% {
        opacity: 0.5;
    }
`;

const _keyframes = {
  blink,
};

export default _keyframes;
