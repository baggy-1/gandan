import { css, useTheme } from '@emotion/react';
import Link from 'next/link';
import { useBeforeInstallPrompt } from '~/hooks';
import getUserDevice from '~/utils/getUserDevice';

const CHROME_INTENT_URL =
  'intent://gandan-news.vercel.app/#Intent;scheme=https;package=com.android.chrome;end';

const createMesage = (userDevice: ReturnType<typeof getUserDevice>) => {
  switch (userDevice) {
    case 'ios':
      return '앱을 설치하기 위해서 사파리로 이동해주세요';
    case 'android':
      return '앱을 설치하기 위해서 크롬으로 이동해주세요. 하단의 버튼을 누르면 크롬으로 이동됩니다.';
    default:
      return '데스크탑은 주소창 우측에 설치 버튼을 눌러주세요.';
  }
};

const DownloadContainer = () => {
  const { colors } = useTheme();
  const { installable, openInstallPrompt } = useBeforeInstallPrompt();
  const userDevice = getUserDevice();

  return (
    <div>
      <div
        css={css`
          width: 100%;
          padding: 1rem;
        `}
      >
        이제, 앱으로도 이용할 수 있습니다.
        <br />
        <span
          css={css`
            color: ${colors.primary};
            font-weight: 700;
          `}
        >
          앱을 설치하고{' '}
        </span>
        더욱 편리하게 이용해보세요.
      </div>
      <div
        css={css`
          padding: 1rem;
        `}
      >
        {installable ? (
          <>
            <div
              css={css`
                padding-bottom: 1rem;
              `}
            >
              하단의 버튼을 눌러 설치해주세요.
            </div>
            <button
              css={css`
                background-color: ${colors.primary};
                color: #ffffff;
                width: fit-content;
                height: 2rem;
                display: flex;
                justify-content: center;
                align-items: center;
                padding: 1rem;
                border-radius: 1rem;
              `}
              type="button"
              onClick={openInstallPrompt}
            >
              설치하기
            </button>
          </>
        ) : (
          <>
            <div
              css={css`
                word-break: keep-all;
                width: 90%;
                padding-bottom: 1rem;
              `}
            >
              {createMesage(userDevice)}
            </div>

            {userDevice === 'android' && (
              <Link
                href={CHROME_INTENT_URL}
                css={css`
                  background-color: ${colors.primary};
                  color: #ffffff;
                  width: fit-content;
                  height: 2rem;
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  padding: 1rem;
                  border-radius: 1rem;
                `}
              >
                크롬으로 열기
              </Link>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default DownloadContainer;
