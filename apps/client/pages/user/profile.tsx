import ProfileViews from '@views/Profile';
import { OpenGraph } from '~/components/common';

const Profile = () => {
  return (
    <>
      <OpenGraph title="사용자 정보" path="/user/profile" />
      <ProfileViews />
    </>
  );
};

export default Profile;
