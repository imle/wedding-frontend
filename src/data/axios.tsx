import axios, {AxiosInstance, AxiosRequestConfig} from "axios";

const instance: AxiosInstance = ((): AxiosInstance => {
  let options: AxiosRequestConfig = {
      withCredentials: true,
  };

  if (process.env.NODE_ENV !== "production" && !!process.env.REACT_APP_BACKEND) {
    let loc = process.env.REACT_APP_BACKEND
    const matches = /#{([a-zA-Z]+?)}/g.exec(loc);
    if (matches && matches.length > 1) {
      matches.slice(1).forEach((tpl: string) => {
        // Strip the special characters to dynamically get the indices of the object
        if (tpl in window.location && typeof window.location[tpl as keyof Location] === "string") {
          loc = loc.replace(`#{${tpl}}`, window.location[tpl as keyof Location] as string);
        }
      });
    }


    options.baseURL = loc;
  }

  return axios.create(options);
})();

export default instance;
