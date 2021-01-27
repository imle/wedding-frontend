import axios, {AxiosInstance} from "axios";

const instance = ((): AxiosInstance => {
  if (process.env.NODE_ENV !== "production" && !!process.env.REACT_APP_BACKEND) {
    return axios.create({
      baseURL: process.env.REACT_APP_BACKEND,
      withCredentials: true,
    })
  }

  return axios.create();
})();

export default instance;

export const APIHost = ((): string => {
  if (process.env.NODE_ENV !== "production" && !!process.env.REACT_APP_BACKEND) {

    return process.env.REACT_APP_BACKEND;
  } else {
    return window.location.hostname;
  }
})();
