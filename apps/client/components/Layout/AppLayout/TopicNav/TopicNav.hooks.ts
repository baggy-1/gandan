import { useEffect, useState } from 'react';

const useScrollTopicBox = (ref: HTMLDivElement | null) => {
  const [scrollPosition, setScrollPosition] = useState({
    isLeftShow: false,
    isRightShow: false,
  });

  const onClickScrollX = (pixel: number) => {
    if (!ref) {
      return;
    }

    const movePixel = ref.scrollLeft + pixel;

    ref.scrollTo({
      left: movePixel,
      behavior: 'smooth',
    });

    const { isLeftShow, isRightShow } = isArrowShow(ref, movePixel);

    if (isLeftShow || isRightShow) {
      setScrollPosition({
        isLeftShow,
        isRightShow,
      });
    }
  };

  useEffect(() => {
    if (!ref) {
      return;
    }

    const { isLeftShow, isRightShow } = isArrowShow(ref, ref.scrollLeft);

    if (isLeftShow || isRightShow) {
      setScrollPosition({
        isLeftShow,
        isRightShow,
      });
    }
  }, [ref]);

  return {
    scrollPosition,
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
