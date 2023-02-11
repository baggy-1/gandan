import { NextApiRequest, NextApiResponse } from 'next';
import {
  createBookmarkByUserId,
  deleteBookmarkByUserId,
  getBookmarkByUserId,
} from '~/services/server/bookmark';
import { getUserIdInPayload } from '../api.util';
import { parseBookmark, sortedBookmark } from './bookmark.util';

const bookmarkHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { query } = req;
  const userId = getUserIdInPayload(query);

  if (!userId) {
    return res.status(401).json({ message: 'check payload' });
  }

  if (req.method === 'POST') {
    if (!req.body) {
      return res.status(400).json({ message: 'check body' });
    }

    try {
      const bookmark = await createBookmarkByUserId(userId, req.body);

      return res.status(200).json(bookmark);
    } catch (error) {
      return res.status(500).json({ error });
    }
  }

  if (req.method === 'GET') {
    try {
      const originBookmarks = await getBookmarkByUserId(userId);

      if (!originBookmarks) {
        return res.status(200).json([]);
      }

      const parsedBookmarks = parseBookmark(originBookmarks);
      const bookmarks = sortedBookmark(parsedBookmarks);

      return res.status(200).json(bookmarks);
    } catch (error) {
      return res.status(500).json({ error });
    }
  }

  if (req.method === 'DELETE') {
    try {
      await deleteBookmarkByUserId(userId, req.body.newsId);
      return res
        .status(200)
        .json({ success: true, message: 'deleted bookmark' });
    } catch (error) {
      return res.status(500).json({ error });
    }
  }

  res.setHeader('Allow', ['POST', 'GET', 'DELETE']);
  return res.status(405).json({ message: 'check method' });
};

export default bookmarkHandler;
