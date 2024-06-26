export const INVALID_INPUT = "invalid input";
export const NOT_FOUND = "Not Found";
export const BAD_REQUEST = "Bad Request";

export enum STATUS_CODE {
  OK = 200,
  CREATED = 201,
  NOT_FOUND = 404,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  INTERNAL_SERVER_ERROR = 500,
}

export const sleep = (time = 1000) => new Promise((resolve) => setTimeout(resolve, time));
