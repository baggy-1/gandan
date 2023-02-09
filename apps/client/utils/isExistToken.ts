import Cookies from 'js-cookie';
import { token } from '~/constants';

const isExistToken = () => {
  return !!(Cookies.get(token.accessToken) || Cookies.get(token.refreshToken));
};

export default isExistToken;
