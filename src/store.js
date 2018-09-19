// @flow

export const store = {};

export const get = (key: string) => {
  return store[key];
};

export const set = (key: string, value: any) => {
  store[key] = value;
};
