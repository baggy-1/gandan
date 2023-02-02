import { css } from '@emotion/react';

const breakpoints = {
  mobile: 0,
  mobileLarge: 425,
  tablet: 768,
  desktop: 1024,
} as const;

// css composition https://emotion.sh/docs/composition
/**
 * @emotion-react-type
 *
 * export function css(
 *   template: TemplateStringsArray,
 *   ...args: Array<CSSInterpolation>
 * ): SerializedStyles
 */

const getMediaQuery = (query: string) => (template: TemplateStringsArray) =>
  css`
    @media only screen and (min-width: ${query}) {
      ${template.raw.join('')}
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
