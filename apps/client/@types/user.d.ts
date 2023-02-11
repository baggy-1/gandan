interface User {
  id: string;
  nickname: string;
  profile?: string;
  email?: string;
  createAt: string | Date;
  loginType: string;
}

interface Bookmark {
  id: string;
  title: string;
  thumbnail: Thumbnail;
  createAt: string | Date;
}

interface ServerBookmark {
  [key: News['id']]: Bookmark;
}
