import {
  Button,
  Container,
  Heading,
  Stack,
  Text,
  HStack,
} from '@chakra-ui/react';
import { useTheme, css } from '@emotion/react';
import Image from 'next/image';
import { kakaoLoginLargeWide } from '@images/kakao';
import { googleLogoDark } from '@images/google';

const LoginContainer = () => {
  const { colors } = useTheme();

  return (
    <Container
      css={css`
        padding: 1rem;
        width: 100%;
        height: 100%;
        margin-top: 4rem;
      `}
    >
      <Stack
        css={css`
          gap: 8rem;
        `}
      >
        <Heading
          css={css`
            font-size: 1.5rem;
            text-align: center;
          `}
        >
          가입하면{' '}
          <Text
            css={css`
              display: inline;
              font-weight: bold;
            `}
          >
            다양한 기능
          </Text>
          <br />
          사용 가능
        </Heading>
        <Stack
          css={css`
            justify-content: center;
            align-items: center;
            gap: 0.5rem;
          `}
        >
          <Button
            css={css`
              &:before {
                content: '3초안에 로그인하기';
                position: absolute;
                top: -3rem;
                left: 50%;
                padding: 0.5rem 1rem;
                transform: translateX(-50%);
                color: ${colors.black};
                background-color: ${colors.white};
                border: 1px solid ${colors.grayE8};
                border-radius: 1.5rem;
              }
            `}
          >
            <Image
              src={kakaoLoginLargeWide}
              alt="kakao-login"
              width={320}
              height={48}
            />
          </Button>
          <Button
            css={css`
              width: 320px;
              height: 48px;
              background-color: ${colors.google};
            `}
          >
            <HStack
              css={css`
                width: 100%;
                height: 100%;
                justify-content: space-baseline;
                padding: 0 0.5rem;
              `}
            >
              <Image
                src={googleLogoDark}
                alt="google-login"
                width={32}
                height={32}
              />
              <Text
                css={css`
                  flex: 1;
                  padding: 0 1rem 0 0;
                  color: ${colors.white};
                `}
              >
                구글 로그인
              </Text>
            </HStack>
          </Button>
        </Stack>
      </Stack>
    </Container>
  );
};

export default LoginContainer;
