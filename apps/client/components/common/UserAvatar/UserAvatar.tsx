import { Avatar } from '@chakra-ui/react';
import { css } from '@emotion/react';
import Image from 'next/image';

interface AvatarProps {
  profile?: string;
  onClick?: () => void;
  width?: number;
  height?: number;
}

const UserAvatar = ({
  profile,
  onClick,
  width = 32,
  height = 32,
}: AvatarProps) => {
  return profile ? (
    <Image
      src={profile}
      alt="user-profile"
      width={width}
      height={height}
      css={css`
        border-radius: 50%;
        cursor: pointer;
      `}
      onClick={onClick}
    />
  ) : (
    <Avatar
      css={css`
        width: 2rem;
        height: 2rem;
        cursor: pointer;
      `}
      onClick={onClick}
    />
  );
};

export default UserAvatar;
