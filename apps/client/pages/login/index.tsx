import { Button, Container, Heading, Stack, Text } from '@chakra-ui/react';
import { useTheme, css } from '@emotion/react';

const login = () => {
  const { colors, typography } = useTheme();

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
          gap: 4rem;
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
              background-color: ${colors.kakao};
              width: 20rem;
              height: 3rem;
              border-radius: 0.5rem;
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
            <Text
              css={css`
                ${typography.headline5}
              `}
            >
              카카오로 계속하기
            </Text>
          </Button>
          <Button
            css={css`
              background-color: ${colors.google};
              width: 20rem;
              height: 3rem;
              border-radius: 0.5rem;
            `}
          >
            <Text
              css={css`
                ${typography.headline5}
                color: ${colors.white}
              `}
            >
              구글로 계속하기
            </Text>
          </Button>
        </Stack>
      </Stack>
    </Container>
  );
};

export default login;
