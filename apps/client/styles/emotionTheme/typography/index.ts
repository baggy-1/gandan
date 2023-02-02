/**
 * @desc font weighs
 *
 * https://developer.mozilla.org/ko/docs/Web/CSS/font-weight
 */
const weighs = {
  light: 300,
  normal: 400,
  medium: 500,
  semiBold: 600,
  bold: 700,
  extraBold: 800,
  heavy: 900,
} as const;

/**
 * @desc type scale
 *
 * https://m2.material.io/design/typography/the-type-system.html#type-scale
 */
const typeScale = {
  headline1: {
    fontSize: '96px',
    fontWeight: weighs.light,
    letterSpacing: '-1.5px',
  },
  headline2: {
    fontSize: '60px',
    fontWeight: weighs.light,
    letterSpacing: '-0.5px',
  },
  headline3: {
    fontSize: '48px',
    fontWeight: weighs.normal,
    letterSpacing: '0px',
  },
  headline4: {
    fontSize: '34px',
    fontWeight: weighs.normal,
    letterSpacing: '0.25px',
  },
  headline5: {
    fontSize: '24px',
    fontWeight: weighs.normal,
    letterSpacing: '0px',
  },
  headline6: {
    fontSize: '20px',
    fontWeight: weighs.medium,
    letterSpacing: '0.15px',
  },
  subtitle1: {
    fontSize: '16px',
    fontWeight: weighs.normal,
    letterSpacing: '0.15px',
  },
  subtitle2: {
    fontSize: '14px',
    fontWeight: weighs.normal,
    letterSpacing: '0.1px',
  },
  body1: {
    fontSize: '16px',
    fontWeight: weighs.normal,
    letterSpacing: '0.5px',
  },
  body2: {
    fontSize: '14px',
    fontWeight: weighs.normal,
    letterSpacing: '0.25px',
  },
  button: {
    fontSize: '14px',
    fontWeight: weighs.medium,
    letterSpacing: '1.25px',
  },
  caption: {
    fontSize: '12px',
    fontWeight: weighs.normal,
    letterSpacing: '0.4px',
  },
  overline: {
    fontSize: '10px',
    fontWeight: weighs.normal,
    letterSpacing: '1.5px',
  },
} as const;

const fontFamily = `"Pretendard Variable", Pretendard, -apple-system, BlinkMacSystemFont, system-ui, Roboto, "Helvetica Neue", "Segoe UI", "Apple SD Gothic Neo", "Noto Sans KR", "Malgun Gothic", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", sans-serif;`;

const getTypography = (type: keyof typeof typeScale) => `
  font-family: ${fontFamily};
  font-size: ${typeScale[type].fontSize};
  font-weight: ${typeScale[type].fontWeight};
  letter-spacing: ${typeScale[type].letterSpacing};
`;

/**
 * @todo util package로 분리 예정입니다.
 */
const typography = Object.entries(typeScale).reduce(
  (acc, [type]) => ({
    ...acc,
    [type]: getTypography(type as keyof typeof typeScale),
  }),
  {}
) as Record<keyof typeof typeScale, ReturnType<typeof getTypography>>;

export default typography;
