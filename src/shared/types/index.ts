export type ApiResponseType<T> = {
  status: string;
  message: string;
  timestamp: string;
  data: T;
};
