import { css, SerializedStyles } from '@emotion/react';

const breakpoints = {
  mobile: 0,
  mobileLarge: 425,
  tablet: 768,
  desktop: 1024,
} as const;

const isString = (arg: unknown): arg is string => typeof arg === 'string';

const isEmptyArray = (array: unknown[]) => array.length === 0;

const hasEverySerializedStylesProps = (
  arg: object
): arg is Record<keyof SerializedStyles, unknown> => {
  const props = ['name', 'styles', 'map', 'next'] as const;

  return props.every(prop => Object.prototype.hasOwnProperty.call(arg, prop));
};

const isSerializedStyles = (
  arg: unknown | SerializedStyles
): arg is SerializedStyles => {
  return !!(
    arg &&
    typeof arg === 'object' &&
    hasEverySerializedStylesProps(arg) &&
    isString(arg.name) &&
    isString(arg.styles) &&
    (arg.map === undefined || isString(arg.map)) &&
    (arg.next === undefined || isSerializedStyles(arg.next))
  );
};

const mergeSerializedStyles = (
  prev: string | SerializedStyles,
  target: string | SerializedStyles
) => css`
  ${prev}
  ${target}
`;

const interleave = <T, U>(front: readonly T[], back: readonly U[]) =>
  front.reduce(
    (acc, cur, index) =>
      back[index] ? [...acc, cur, back[index]] : [...acc, cur],
    [] as (T | U)[]
  );

const getSerializedStyles = (
  template: TemplateStringsArray,
  args: unknown[]
) => {
  if (isEmptyArray(args)) {
    return template.raw.join('');
  }

  const correntArgs = args.filter(
    (arg): arg is string | SerializedStyles =>
      isString(arg) || isSerializedStyles(arg)
  );

  const interleaveTemplateArgs = interleave(template, correntArgs);

  const serializedStyles = interleaveTemplateArgs.reduce<SerializedStyles>(
    (acc, cur) => mergeSerializedStyles(acc, cur),
    css``
  );

  return css`
    ${serializedStyles}
  `;
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
        ${getSerializedStyles(template, args)}
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
