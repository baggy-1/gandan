import { VStack } from '@chakra-ui/react';
import { css } from '@emotion/react';
import Headline from '../Headline';

const headlineWidths = [
  '60%',
  '70%',
  '50%',
  '40%',
  '80%',
  '60%',
  '70%',
  '50%',
  '40%',
  '80%',
];

const HeadlineContainer = () => {
  return (
    <VStack
      css={css`
        width: 100%;
        gap: 1rem;
      `}
    >
      {headlineWidths.map((width, index) => {
        // eslint-disable-next-line react/no-array-index-key
        return <Headline key={index} textWidth={width} />;
      })}
    </VStack>
  );
};

export default HeadlineContainer;
