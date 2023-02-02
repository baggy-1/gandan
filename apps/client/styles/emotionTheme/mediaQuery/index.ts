import { css } from '@emotion/react';

const breakpoints = {
  mobile: 0,
  mobileLarge: 425,
  tablet: 768,
  desktop: 1024,
} as const;

const isEmptyArray = (array: unknown[]) => array.length === 0;

const serializedStyles = (template: TemplateStringsArray, args: unknown[]) => {
  if (isEmptyArray(args)) {
    return template.raw.join('');
  }

  return template.reduce((acc, cur, index) => acc + cur + args[index], '');
};

/**
 * @emotion-react-type
 *
 * export function css(
 *   template: TemplateStringsArray,
 *   ...args: Array<CSSInterpolation>
 * ): SerializedStyles
 *
 * @see https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Template_literals
 * @see https://emotion.sh/docs/composition
 */
const getMediaQuery =
  (query: string) =>
  (template: TemplateStringsArray, ...args: unknown[]) =>
    css`
      @media only screen and (min-width: ${query}) {
        ${serializedStyles(template, args)}
      }
    `;

/**
 * @todo util package로 분리 예정입니다.
 * @desc mobile first로 min-width가 적용됩니다.
 * @example
 * css`
 *   ${mediaQuery.tablet`
 *     color: red;
 *   `}
 * `
 */
const mediaQuery = Object.entries(breakpoints).reduce(
  (acc, [device, width]) => ({
    ...acc,
    [device]: getMediaQuery(`${width}px`),
  }),
  {}
) as Record<keyof typeof breakpoints, ReturnType<typeof getMediaQuery>>;

export default mediaQuery;
