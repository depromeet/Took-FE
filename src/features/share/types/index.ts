export type JopType = 'DESIGNER' | 'DEVELOPER';
export type PreviewInfoType = 'PROJECT' | 'CONTENT' | 'HOBBY' | 'SNS' | 'NEWS' | 'REGION';

export type OpenCardDto = {
  status: string;
  message: string;
  timestamp: string;
  data: Card;
};

export type Card = {
  id: number;
  nickname: string;
  organization: string;
  job: JopType;
  detailJob: string;
  summary: string;
  interestDomain: string[];
  previewInfoType: PreviewInfoType;
  previewInfo: PreviewInfo;
  imagePath: string;
};

export type PreviewInfo = {
  project?: Project;
  content?: Content;
  hobby?: string;
  sns?: SNS;
  news?: string;
  region?: string;
};

type Project = {
  title: string;
  link: string;
  imageUrl: string;
  description: string;
};

type Content = {
  title: string;
  link: string;
  imageUrl: string;
  description: string;
};

type SNS = {
  type: string;
  link: string;
};
