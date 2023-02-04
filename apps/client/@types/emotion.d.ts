import '@emotion/react';
import type { emotionTheme } from '~/styles';

/**
 * @desc emotion define theme
 *
 * @see https://emotion.sh/docs/typescript#define-a-theme
 */
declare module '@emotion/react' {
  type EmotionTheme = typeof emotionTheme;

  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface Theme extends EmotionTheme {}
}
