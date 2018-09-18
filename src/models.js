type status = "successful";

type Breeds = {
  [key: string]: string[]
};

type Response<T> = {
  status: status,
  message: T
};

export type RenderProps<T> = {
  loading: boolean,
  error: any,
  data: T
};

export type BreedsResponse = Response<Breeds>;
