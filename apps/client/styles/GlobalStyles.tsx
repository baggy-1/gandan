import { css, Global } from '@emotion/react';

const GlobalStyles = () => {
  return (
    <Global
      styles={css`
        * {
          margin: 0;
          padding: 0;
          font: inherit;
          color: inherit;
          font-family: 'Pretendard Variable', Pretendard, -apple-system,
            BlinkMacSystemFont, system-ui, Roboto, 'Helvetica Neue', 'Segoe UI',
            'Apple SD Gothic Neo', 'Noto Sans KR', 'Malgun Gothic',
            'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', sans-serif;
        }

        *,
        :after,
        :before {
          box-sizing: border-box; // default content-box
          flex-shrink: 0; // default 1
        }

        // html
        :root {
          -webkit-tap-highlight-color: transparent;
          -webkit-text-size-adjust: 100%;
          overflow-wrap: break-word;
          word-break: break-word;
        }

        html,
        body {
          height: 100%;
        }

        img,
        picture,
        video,
        canvas,
        svg {
          display: block;
          max-width: 100%;
        }

        button {
          background: none;
          border: 0;
          cursor: pointer;
        }

        a {
          text-decoration: none;
        }

        table {
          border-collapse: collapse;
          border-spacing: 0;
        }
      `}
    />
  );
};

export default GlobalStyles;
