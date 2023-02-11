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
  thumbnail: string;
}
