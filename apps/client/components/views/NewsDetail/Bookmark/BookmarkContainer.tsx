import { Bookmark } from '~/assets/svgs/common';
import { useToast } from '~/components/common';
import {
  useCreateBookmark,
  useDeleteBookmark,
} from '~/services/client/bookmark';
import { useQueryBookmark } from '~/services/client/bookmark/queries';
import { useQueryNewsById } from '~/services/client/news';
import { useQueryMe } from '~/services/client/user';
import { getKoreaDate } from '~/utils';

interface Props {
  newsId: News['id'];
}

const BookmarkContainer = ({ newsId }: Props) => {
  const { data: me } = useQueryMe();
  const { data: news } = useQueryNewsById(newsId);
  const { data: bookmarks } = useQueryBookmark();
  const { mutate: createBookmarkMutate } = useCreateBookmark();
  const { mutate: deleteBookmarkMutate } = useDeleteBookmark();
  const toast = useToast();

  const isCheckedBookmark = bookmarks?.some(bookmark => bookmark.id === newsId);

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
      deleteBookmarkMutate(newsId, {
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
    const { title, thumbnail } = news;

    createBookmarkMutate(
      {
        id: newsId,
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
    <button onClick={onClickBookmarkAction} type="button">
      <Bookmark fill={isCheckedBookmark} />
    </button>
  );
};

export default BookmarkContainer;
