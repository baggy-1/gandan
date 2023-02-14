type LoginType = 'kakao' | 'google';

interface User {
  id: `${string}-@-${LoginType}`;
  nickname: string;
  profile?: string;
  email?: string;
  createAt: string | Date;
  loginType: LoginType;
  name: string;
}

interface Bookmark {
  id: News['id'];
  title: string;
  thumbnail: Thumbnail;
  createAt: string | Date;
}

interface ServerBookmark {
  [key: News['id']]: Bookmark;
}
