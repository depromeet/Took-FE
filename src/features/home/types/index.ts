export type JopType = 'designer' | 'developer';
export type PreviewInfoType = 'PROJECT' | 'CONTENT' | 'HOBBY' | 'SNS' | 'NEWS' | 'REGION';

export type MyCardDto = {
  status: string;
  message: string;
  timestamp: string;
  data: {
    cards: Card[];
  };
};

export type Card = {
  id: number;
  nickname: string;
  organization: string;
  job: string;
  detailJob: string;
  summary: string;
  interestDomain: string[];
  previewInfoType: PreviewInfoType;
  previewInfo: PreviewInfo;
  imagePath: string;
};

type PreviewInfo = {
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
