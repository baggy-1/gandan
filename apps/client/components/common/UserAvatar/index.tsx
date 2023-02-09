import { Avatar } from '@chakra-ui/react';
import { css } from '@emotion/react';
import Image from 'next/image';

interface AvatarProps {
  profile?: string;
}

const UserAvatar = ({ profile }: AvatarProps) => {
  return profile ? (
    <Image
      src={profile}
      alt="user-profile"
      width={32}
      height={32}
      css={css`
        border-radius: 50%;
      `}
    />
  ) : (
    <Avatar
      css={css`
        width: 2rem;
        height: 2rem;
      `}
    />
  );
};

export default UserAvatar;
