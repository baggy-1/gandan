import { Box, Center, Flex, Text } from '@chakra-ui/react';
import { css, useTheme } from '@emotion/react';
import dayjs from 'dayjs';
import 'dayjs/locale/ko';
import { Bookmark } from '~/assets/svgs/common';
import {
  useCreateBookmark,
  useDeleteBookmark,
} from '~/services/client/bookmark';
import { useQueryBookmark } from '~/services/client/bookmark/queries';
import { useQueryMe } from '~/services/client/user';
import { getKoreaDate } from '~/utils';
import { useToast } from '~/components/common';

type Props = Pick<News, 'id' | 'title' | 'thumbnail' | 'createAt'>;

const Header = ({ id, title, thumbnail, createAt }: Props) => {
  const { typography } = useTheme();
  const { data: me } = useQueryMe();
  const { data: bookmarks } = useQueryBookmark();
  const { mutate: createBookmarkMutate } = useCreateBookmark();
  const { mutate: deleteBookmarkMutate } = useDeleteBookmark();
  const toast = useToast();

  const isCheckedBookmark = bookmarks?.some(bookmark => bookmark.id === id);

  const onClickBookmarkAction = () => {
    if (!me) {
      toast({
        title: '로그인이 필요한 서비스입니다.',
        description: '로그인 후 북마크 기능을 이용해보세요!',
        status: 'warning',
      });
      return;
    }

    if (isCheckedBookmark) {
      deleteBookmarkMutate(id, {
        onSuccess: () => {
          toast({
            title: '북마크가 삭제되었습니다.',
            status: 'success',
            duration: 1000,
          });
        },
      });
      return;
    }

    const { datetime } = getKoreaDate(new Date());

    createBookmarkMutate(
      {
        id,
        title,
        thumbnail,
        createAt: datetime,
      },
      {
        onSuccess: () => {
          toast({
            title: '북마크가 추가되었습니다.',
            status: 'success',
            duration: 1000,
          });
        },
      }
    );
  };

  return (
    <Flex
      css={css`
        width: 100%;
        justify-content: space-between;
        padding: 0 1rem;
      `}
    >
      <Box>
        <Text
          css={css`
            ${typography.headline6}
          `}
        >
          {dayjs(createAt).locale('ko-KR').format('MM월 DD일 dddd')}
        </Text>
        <Text
          css={css`
            ${typography.body2}
          `}
        >
          {createAt}
        </Text>
      </Box>
      <Center
        css={css`
          cursor: pointer;
        `}
        onClick={onClickBookmarkAction}
      >
        <Bookmark fill={isCheckedBookmark} />
      </Center>
    </Flex>
  );
};

export default Header;
