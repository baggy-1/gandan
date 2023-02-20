import { useState } from 'react';
import {
  MagnifyingGlassMinus,
  MagnifyingGlassPlus,
} from '~/assets/svgs/common';

const useMagnifying = () => {
  const [isFontSizeLarge, setIsFontSizeLarge] = useState(false);

  const toggleFontSize = () => {
    setIsFontSizeLarge(prev => !prev);
  };

  return {
    isFontSizeLarge,
    toggleFontSize,
    Icon: isFontSizeLarge ? MagnifyingGlassMinus : MagnifyingGlassPlus,
  };
};

export default useMagnifying;
