import { css, useTheme } from '@emotion/react';
import { useToast } from '~/components/common';
import { useCreateSubscription } from '~/services/client/pwa/subscription';
import { subscriptionAction } from './Notice.utils';

const NoticeContainer = () => {
  const toast = useToast();
  const { mutate: createSubscription } = useCreateSubscription();
  const { colors } = useTheme();

  const onClickSubscription = async () => {
    const { type, pushSubscription } = await subscriptionAction();

    if (type === 'denied') {
      toast({
        title: '알림을 받을 수 없습니다.',
        description: '브라우저에서 알림을 차단하셨습니다.',
        status: 'error',
      });
      return;
    }

    if (type === 'notSupported') {
      toast({
        title: '알림을 받을 수 없습니다.',
        description:
          '브라우저가 알림을 지원하지 않습니다. 크롬이나 사파리를 이용해주세요.',
        status: 'error',
      });
      return;
    }

    if (type === 'subscriptioned') {
      toast({
        title: '이미 알림을 받고 있습니다.',
        description: '알림을 받고 싶지 않으시면 알림 설정에서 해제해주세요.',
        status: 'info',
      });
      return;
    }

    if (!pushSubscription) {
      toast({
        title: '에러가 발생했습니다.',
        description: '알림 권한을 재설정 후 다시 시도해주세요.',
        status: 'error',
      });
      return;
    }

    createSubscription(pushSubscription, {
      onSuccess: () => {
        toast({
          title: '알림 등록에 성공했습니다.',
          description: '매일 아침, 뉴스가 발행되면 알림을 보내드립니다.',
          status: 'success',
        });
      },
      onError: () => {
        toast({
          title: '알림 등록에 실패했습니다.',
          description: '다시 시도 부탁드립니다.',
          status: 'error',
        });
      },
    });
  };

  return (
    <div>
      <div
        css={css`
          width: 100%;
          padding: 1rem;
        `}
      >
        매일 아침, <br /> 뉴스가 발행되면{' '}
        <span
          css={css`
            color: ${colors.primary};
            font-weight: 700;
          `}
        >
          알림을 보내드립니다.
        </span>
      </div>
      <div
        css={css`
          width: 100%;
          padding: 1rem;
        `}
      >
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
          onClick={onClickSubscription}
        >
          알림 받기
        </button>
      </div>
    </div>
  );
};

export default NoticeContainer;
