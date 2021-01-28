import axios, {AxiosInstance, AxiosRequestConfig} from "axios";

const instance: AxiosInstance = ((): AxiosInstance => {
  let options: AxiosRequestConfig = {
      withCredentials: true,
  };

  if (process.env.NODE_ENV !== "production" && !!process.env.REACT_APP_BACKEND) {
    options.baseURL = process.env.REACT_APP_BACKEND;
  }

  return axios.create(options);
})();

export default instance;
