interface Props {
  width?: string | number;
  height?: string | number;
  fill?: 'unchecked' | 'checked';
}

const fillState = {
  unchecked: 'none',
  checked: 'yellow',
};

const Bookmark = ({
  width = '2rem',
  height = '2rem',
  fill = 'unchecked',
}: Props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill={fillState[fill]}
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-6 h-6"
      width={width}
      height={height}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z"
      />
    </svg>
  );
};

export default Bookmark;
