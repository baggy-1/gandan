interface User {
  id: string;
  nickname: string;
  profile?: string;
  email?: string;
  createAt: string | Date;
  loginType: string;
}
