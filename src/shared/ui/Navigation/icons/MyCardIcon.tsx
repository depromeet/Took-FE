type Props = {
  strokeColor: string;
};

export const MyCardIcon = ({ strokeColor }: Props) => {
  return (
    <svg width="29" height="28" viewBox="0 0 29 28" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M22.1811 6.5H5.81745C4.8133 6.5 3.99927 7.2835 3.99927 8.25V18.75C3.99927 19.7165 4.8133 20.5 5.81745 20.5H22.1811C23.1852 20.5 23.9993 19.7165 23.9993 18.75V8.25C23.9993 7.2835 23.1852 6.5 22.1811 6.5Z"
        stroke={strokeColor}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M3.99927 11.7501H23.9993"
        stroke={strokeColor}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
