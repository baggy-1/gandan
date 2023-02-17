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

const bottomIn = keyframes`
    0% {
        transform: translate3d(0, 100%, 0);
    }
    60% {
        transform: translate3d(0, -10px, 0);
    }
    100% {
        transform: translate3d(1);
    }
`;

const scaleOut = keyframes`
    0% {
        transform: scale(1);
        opacity: 1;
    }
    100% {
        transform: scale(0.75);
        opacity: 0.8;
    }
`;

const bottomUp = keyframes`
    0% {
        transform: translate3d(0, 100%, 0);
    }
    100% {
        transform: translate3d(1);
    }
`;

const _keyframes = {
  blink,
  bottomIn,
  scaleOut,
  bottomUp,
};

export default _keyframes;
