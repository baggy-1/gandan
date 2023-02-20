import Link from 'next/link';
import { css } from '@emotion/react';

interface Props {
  name: string;
  id: string;
  isActive: boolean;
}

const TopicBadge = ({ name, id, isActive }: Props) => {
  return (
    <Link key={id} href={id === 'daily' ? '/' : `/news/topics/${id}`}>
      <div
        css={css`
          cursor: pointer;
          width: fit-content;
          height: 2rem;
          padding: 0 0.75rem;
          color: ${isActive ? '#ffffff' : '#000000'};
          background-color: ${isActive ? '#0f0f0f' : 'rgba(0, 0, 0, 0.1)'};
          display: flex;
          justify-content: cetner;
          align-items: center;
          border-radius: 0.5rem;
        `}
      >
        {name}
      </div>
    </Link>
  );
};

export default TopicBadge;
