export const APIHost = ((): string => {
  if (process.env.NODE_ENV !== "production" && !!process.env.REACT_APP_BACKEND_PORT) {

    return window.location.hostname + ":" + process.env.REACT_APP_BACKEND_PORT;
  } else {
    return window.location.hostname;
  }
})();
