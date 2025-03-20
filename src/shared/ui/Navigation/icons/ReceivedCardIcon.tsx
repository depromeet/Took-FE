type Props = {
  strokeColor: string;
};

export const ReceivedCardIcon = ({ strokeColor }: Props) => {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M21.7778 21.5H6.22222C4.99492 21.5 4 20.6046 4 19.5V10.5C4 9.39543 4.99492 8.5 6.22222 8.5H21.7778C23.0051 8.5 24 9.39543 24 10.5V19.5C24 20.6046 23.0051 21.5 21.7778 21.5Z"
        stroke={strokeColor}
        strokeWidth="1.5"
      />
      <path
        d="M8.44531 8.94444V5.16667C8.44531 4.79848 8.74379 4.5 9.11198 4.5H18.8898C19.258 4.5 19.5564 4.79848 19.5564 5.16667V8.94444"
        stroke={strokeColor}
        strokeWidth="1.5"
      />
      <path
        d="M19.0009 15.6111C18.6941 15.6111 18.4453 15.3623 18.4453 15.0556C18.4453 14.7488 18.6941 14.5 19.0009 14.5C19.3076 14.5 19.5564 14.7488 19.5564 15.0556C19.5564 15.3623 19.3076 15.6111 19.0009 15.6111Z"
        fill={strokeColor}
        stroke={strokeColor}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
