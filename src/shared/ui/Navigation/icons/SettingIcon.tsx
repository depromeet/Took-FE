type Props = {
  strokeColor: string;
};

export const SettingIcon = ({ strokeColor }: Props) => {
  return (
    <svg width="29" height="28" viewBox="0 0 29 28" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M22.6667 21C23.219 21 23.6667 20.5523 23.6667 20V18.6667C23.6667 17.429 23.1926 16.242 22.3487 15.3668C21.5048 14.4917 20.3602 14 19.1667 14H10.1667C8.97327 14 7.82868 14.4917 6.98477 15.3668C6.14085 16.242 5.66675 17.429 5.66675 18.6667V20"
        stroke={strokeColor}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M14.6667 10.5C16.5997 10.5 18.1667 8.933 18.1667 7C18.1667 5.067 16.5997 3.5 14.6667 3.5C12.7338 3.5 11.1667 5.067 11.1667 7C11.1667 8.933 12.7338 10.5 14.6667 10.5Z"
        stroke={strokeColor}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
