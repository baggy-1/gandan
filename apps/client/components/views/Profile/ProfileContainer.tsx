import { Box, Container, Spinner, Center } from '@chakra-ui/react';
import { Suspense, useRef, useState, useEffect } from 'react';
import { css, useTheme } from '@emotion/react';
import { Flex, UserAvatar, useToast } from '~/components/common';
import { useSuspensedQueryMe, useUpdateMe } from '~/services/client/user';
import useInput from '~/hooks/useInput';

const ProfileContainer = () => {
  const { colors } = useTheme();
  const { data: me } = useSuspensedQueryMe();
  const { mutate: updateNickname } = useUpdateMe();
  const { profile, nickname, email, loginType, name } = me;
  const { value: newNickname, onChange: onChangeNickname } = useInput(nickname);
  const [isEdit, setIsEdit] = useState(false);
  const refNickname = useRef<HTMLInputElement | null>(null);
  const toast = useToast();

  const toggleEdit = () => {
    setIsEdit(prev => !prev);
  };

  const onSubmitNickname = (
    event:
      | React.MouseEvent<HTMLButtonElement>
      | React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (!isClickType(event) && !isKeyDownEnter(event)) {
      return;
    }

    if (!newNickname) {
      toast({
        title: '닉네임을 입력해주세요.',
        status: 'error',
      });

      return;
    }

    if (nickname === newNickname) {
      toast({
        title: '변경사항이 없습니다.',
        status: 'warning',
      });

      setIsEdit(false);
      return;
    }

    updateNickname(
      { nickname: newNickname },
      {
        onSuccess: () => {
          toast({
            title: '닉네임이 성공적으로 변경되었습니다.',
            status: 'success',
          });
        },
      }
    );

    setIsEdit(false);
  };

  useEffect(() => {
    if (isEdit) {
      refNickname.current?.focus();
    }
  }, [isEdit]);

  return (
    <Container
      css={css`
        display: flex;
        flex-direction: column;
        padding: 1rem;
      `}
    >
      <Center flexDirection="column" gap="2rem">
        <Box
          css={css`
            width: 20rem;
            padding: 1rem 0;
          `}
        >
          <p
            css={css`
              font-size: 1.25rem;
              font-weight: 700;
            `}
          >
            내 정보
          </p>
        </Box>
        <Flex direction="column" gap="1rem">
          <Flex direction="column" gap="0.5rem">
            <p
              css={css`
                font-weight: 500;
              `}
            >
              공개 프로필
            </p>
            <p
              css={css`
                font-size: 0.8rem;
              `}
            >
              회원님의 활동하는 동안 사용자에게 다음 정보가 표시됩니다.
            </p>
          </Flex>
          <Flex direction="column" gap="0.5rem">
            <Flex direction="column" gap="0.5rem">
              <p>사진</p>
              <UserAvatar profile={profile} width={64} height={64} />
            </Flex>
            <Flex direction="column" gap="0.5rem">
              <Flex gap="0.5rem" align="center">
                <p>닉네임</p>
                {isEdit ? (
                  <button
                    css={css`
                      font-size: 0.8rem;
                      color: ${colors.primary};
                    `}
                    type="button"
                    onClick={onSubmitNickname}
                    tabIndex={0}
                  >
                    저장
                  </button>
                ) : (
                  <button
                    css={css`
                      font-size: 0.8rem;
                      color: ${colors.primary};
                    `}
                    type="button"
                    onClick={toggleEdit}
                  >
                    편집
                  </button>
                )}
              </Flex>
              <input
                css={css`
                  border-radius: 0.5rem;
                  border: 1px solid ${colors.grayE8};
                  background-color: ${isEdit ? colors.white : colors.grayE8};
                  width: 20rem;
                  height: 2.5rem;
                  padding: 1rem;
                  outline: none;
                `}
                type="text"
                ref={refNickname}
                value={newNickname}
                onChange={onChangeNickname}
                onKeyDown={onSubmitNickname}
                disabled={!isEdit}
              />
            </Flex>
          </Flex>
        </Flex>
        <Flex direction="column" gap="1rem">
          <Flex direction="column" gap="0.5rem">
            <p
              css={css`
                font-weight: 500;
              `}
            >
              계정 정보
            </p>
            <p
              css={css`
                font-size: 0.8rem;
              `}
            >
              이 정보는 로그인 정보이며, 수정이 불가합니다.
            </p>
          </Flex>
          <Flex direction="column" gap="0.5rem">
            <p>로그인 타입</p>
            <p
              css={css`
                border-radius: 0.5rem;
                border: 1px solid ${colors.grayE8};
                background-color: ${colors.grayE8};
                width: 20rem;
                height: 2.5rem;
                display: flex;
                align-items: center;
                padding-left: 1rem;
              `}
            >
              {loginType}
            </p>
          </Flex>
          <Flex direction="column" gap="0.5rem">
            <p>로그인 이메일</p>
            <p
              css={css`
                border-radius: 0.5rem;
                border: 1px solid ${colors.grayE8};
                background-color: ${colors.grayE8};
                width: 20rem;
                height: 2.5rem;
                display: flex;
                align-items: center;
                padding-left: 1rem;
              `}
            >
              {email ?? '미동의'}
            </p>
          </Flex>
          <Flex direction="column" gap="0.5rem">
            <p>이름</p>
            <p
              css={css`
                border-radius: 0.5rem;
                border: 1px solid ${colors.grayE8};
                background-color: ${colors.grayE8};
                width: 20rem;
                height: 2.5rem;
                display: flex;
                align-items: center;
                padding-left: 1rem;
              `}
            >
              {name}
            </p>
          </Flex>
        </Flex>
      </Center>
    </Container>
  );
};

const SuspenseProfileContainer = () => {
  return (
    <Suspense fallback={<Spinner />}>
      <ProfileContainer />
    </Suspense>
  );
};

export default SuspenseProfileContainer;

const isClickType = (
  event: React.KeyboardEvent | React.MouseEvent
): event is React.MouseEvent => {
  const { type } = event;

  return type === 'click';
};

const isKeyDownEnter = (event: React.KeyboardEvent) => {
  const { key } = event;

  return key === 'Enter';
};
