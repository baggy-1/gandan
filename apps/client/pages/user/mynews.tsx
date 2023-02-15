import MyNewsViews from '@views/MyNews';
import { OpenGraph } from '~/components/common';

const UserNewsList = () => {
  return (
    <>
      <OpenGraph title="마이페이지" path="/user/mynews" />
      <MyNewsViews />
    </>
  );
};

export default UserNewsList;
