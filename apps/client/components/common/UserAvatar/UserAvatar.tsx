import { css } from '@emotion/react';
import Image from 'next/image';
import avatar from '@images/avatar.jpg';

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
  return (
    <Image
      src={profile ?? avatar}
      alt="user-profile"
      width={width}
      height={height}
      css={css`
        border-radius: 50%;
        cursor: pointer;
      `}
      onClick={onClick}
    />
  );
};

export default UserAvatar;
