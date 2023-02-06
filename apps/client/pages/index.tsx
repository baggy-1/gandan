import Cookies from 'js-cookie';
import { token } from '~/constants';
import api from '~/services/client/api';

const Home = () => {
  const onClick = () => {
    api.post('/api/oauth/token', {
      refreshToken: Cookies.get(token.refreshToken),
    });
  };

  return <button onClick={onClick}>버튼</button>;
};

export default Home;
