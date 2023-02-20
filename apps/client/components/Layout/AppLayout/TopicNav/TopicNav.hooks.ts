import { useEffect, useState } from 'react';

const useScrollTopicBox = (ref: HTMLDivElement | null) => {
  const [isLeftShow, setIsLeftShow] = useState(false);
  const [isRightShow, setIsRightShow] = useState(false);

  const onClickScrollX = (pixel: number) => {
    if (!ref) {
      return;
    }

    const movePixel = ref.scrollLeft + pixel;

    ref.scrollTo({
      left: movePixel,
      behavior: 'smooth',
    });

    const { isLeftShow: leftShow, isRightShow: rightShow } = isArrowShow(
      ref,
      movePixel
    );

    if (isLeftShow) {
      setIsLeftShow(leftShow);
      return;
    }

    if (isRightShow) {
      setIsRightShow(rightShow);
    }
  };

  useEffect(() => {
    if (!ref) {
      return;
    }

    const { isLeftShow: leftShow, isRightShow: rightShow } = isArrowShow(
      ref,
      ref.scrollLeft
    );

    if (isLeftShow) {
      setIsLeftShow(leftShow);
      return;
    }

    if (isRightShow) {
      setIsRightShow(rightShow);
    }
  }, [ref]);

  return {
    scrollPosition: {
      isLeftShow,
      isRightShow,
    },
    onClickScrollX,
  };
};

const isArrowShow = (ref: HTMLDivElement, currentScrollPosition: number) => {
  const isLeftShow = currentScrollPosition > 0;
  const isRightShow = currentScrollPosition + ref.clientWidth < ref.scrollWidth;

  return {
    isLeftShow,
    isRightShow,
  };
};

export default useScrollTopicBox;
