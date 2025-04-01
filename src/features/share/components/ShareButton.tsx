import { toast } from 'sonner';

import { useClipboard } from '@/features/home/hooks/useClipboard';

type Props = {
  profileImg: string;
  name: string;
  jobName: string;
  jobType: 'designer' | 'developer';
  linkUrl: string;
};

export const ShareButton = ({ profileImg, name, jobName, linkUrl }: Props) => {
  const { handleCopy } = useClipboard();

  const shareData = {
    image: profileImg,
    title: name,
    text: jobName,
    url: linkUrl,
  };

  const onClickShare = () => {
    try {
      navigator.share(shareData);
    } catch (e) {
      handleCopy();
      toast.success('명함 링크를 복사했어요.');
    }
  };

  return (
    <svg
      onClick={onClickShare}
      width="36"
      height="36"
      viewBox="0 0 36 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      cursor="pointer"
    >
      <g opacity="0.8">
        <rect x="0.00390625" width="36" height="36" rx="18" fill="white" fillOpacity="0.2" />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M17.9967 9.55424C18.1716 9.55229 18.3399 9.62091 18.4635 9.74458L21.9213 13.2024C22.1752 13.4562 22.1752 13.8678 21.9213 14.1216C21.6675 14.3755 21.2559 14.3755 21.0021 14.1216L18.6539 11.7734V20.0015C18.6539 20.3605 18.3629 20.6515 18.0039 20.6515C17.6449 20.6515 17.3539 20.3605 17.3539 20.0015V11.8242L15.1666 14.1113C14.9184 14.3707 14.507 14.3799 14.2476 14.1318C13.9881 13.8836 13.979 13.4722 14.2271 13.2128L17.5342 9.75493C17.6551 9.62853 17.8218 9.55619 17.9967 9.55424Z"
          fill="white"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M10.3789 18.3004C10.3789 16.8507 11.5542 15.6754 13.0039 15.6754H15.5039C15.8491 15.6754 16.1289 15.9552 16.1289 16.3004C16.1289 16.6456 15.8491 16.9254 15.5039 16.9254H13.0039C12.2445 16.9254 11.6289 17.541 11.6289 18.3004V23.3004C11.6289 24.0598 12.2445 24.6754 13.0039 24.6754H23.0039C23.7633 24.6754 24.3789 24.0598 24.3789 23.3004V18.3004C24.3789 17.541 23.7633 16.9254 23.0039 16.9254H20.5039C20.1587 16.9254 19.8789 16.6456 19.8789 16.3004C19.8789 15.9552 20.1587 15.6754 20.5039 15.6754H23.0039C24.4537 15.6754 25.6289 16.8507 25.6289 18.3004V23.3004C25.6289 24.7501 24.4537 25.9254 23.0039 25.9254H13.0039C11.5542 25.9254 10.3789 24.7501 10.3789 23.3004V18.3004Z"
          fill="white"
        />
      </g>
    </svg>
  );
};
