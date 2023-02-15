import LoginViews from '@views/Login';
import { OpenGraph } from '~/components/common';

const login = () => {
  return (
    <>
      <OpenGraph title="로그인" path="/login" />
      <LoginViews />
    </>
  );
};

export default login;
