import { css } from '@emotion/react';

interface Props {
  children: React.ReactNode;
  colorScheme?: 'default' | 'green' | 'purple' | 'red';
}

const Badge = ({ children, colorScheme = 'default' }: Props) => {
  return (
    <div
      css={css`
        background-color: ${colors.background[colorScheme]};
        color: ${colors.text[colorScheme]};
        padding: 0.25rem;
        border-radius: 0.25rem;
        font-size: 0.75rem;
        font-weight: 700;
        display: inline-block;
        vertical-align: middle;
      `}
    >
      {children}
    </div>
  );
};

const colors = {
  background: {
    default: '#e0e0e0',
    green: '#4CAF50',
    purple: '#9C27B0',
    red: '#F44336',
  },
  text: {
    default: '#333333',
    green: '#FFFFFF',
    purple: '#FFFFFF',
    red: '#FFFFFF',
  },
};

export default Badge;
