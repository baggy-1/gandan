interface Props {
  width?: string;
  height?: string;
  strokeWidth?: number;
  stroke?: string;
  fill?: string;
}

const ChevronLeft = ({
  width = '2rem',
  height = '2rem',
  strokeWidth = 1.5,
  stroke = 'currentColor',
  fill = 'none',
}: Props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill={fill}
      viewBox="0 0 24 24"
      strokeWidth={strokeWidth}
      stroke={stroke}
      className="w-6 h-6"
      width={width}
      height={height}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15.75 19.5L8.25 12l7.5-7.5"
      />
    </svg>
  );
};

export default ChevronLeft;
