import { useMutation, useQueryClient } from '@tanstack/react-query';
import queryKeys from '../querykeys';
import { createBookmark, deleteBookmark } from './apis';

export const useCreateBookmark = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createBookmark,
    onMutate: async bookmark => {
      await queryClient.cancelQueries(queryKeys.bookmarkMe);

      const previousBookmarks = queryClient.getQueryData<Bookmark[]>(
        queryKeys.bookmarkMe
      );

      queryClient.setQueryData<Bookmark[]>(queryKeys.bookmarkMe, old =>
        old ? [...old, bookmark] : [bookmark]
      );

      return { previousBookmarks };
    },
    onError: (_, __, context) => {
      queryClient.setQueryData<Bookmark[]>(
        queryKeys.bookmarkMe,
        context?.previousBookmarks
      );
    },
    onSettled: () => {
      queryClient.invalidateQueries(queryKeys.bookmarkMe);
    },
  });
};

export const useDeleteBookmark = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteBookmark,
    onMutate: async newsId => {
      await queryClient.cancelQueries(queryKeys.bookmarkMe);

      const previousBookmarks = queryClient.getQueryData<Bookmark[]>(
        queryKeys.bookmarkMe
      );

      queryClient.setQueryData<Bookmark[]>(
        queryKeys.bookmarkMe,
        old => old?.filter(bookmark => bookmark.id !== newsId) || []
      );

      return { previousBookmarks };
    },
    onError: (_, __, context) => {
      queryClient.setQueryData<Bookmark[]>(
        queryKeys.bookmarkMe,
        context?.previousBookmarks
      );
    },
    onSettled: () => {
      queryClient.invalidateQueries(queryKeys.bookmarkMe);
    },
  });
};
