import axios, { AxiosResponse } from "axios";
import { Notification } from ".";
import LocalStorage from "./LocalStorage";
const API_URL = process.env.NEXT_PUBLIC_API_URL;
const AxiosClient = axios.create({
  baseURL: API_URL,
  headers: {
    "content-type": "application/json",
  },
});

// handle request to convert all api requests to snake_case
AxiosClient.interceptors.request.use(async (config: any) => {
  const token = LocalStorage.getToken();
  console.log("token", token);
  if (token && config.headers) {
    config.headers.token = `${token}`;
  }

  if (
    config.headers &&
    config.headers["Content-Type"] === "multipart/form-data"
  )
    return config;

  // convert request to snake_case
  if (config.params) {
    config.params = config.params;
  }
  if (config.data) {
    config.data = config.data;
  }

  return config;
});

// handle response to convert all api responses to camelCase
AxiosClient.interceptors.response.use(
  (response: AxiosResponse) => {
    if (response && response.data) {
      if (
        !response.data.status ||
        response.data.code === 400 ||
        response.data.code === 403
      ) {
        switch (response.data.code) {
          case 400:
            if (response.data.details && response.data.details.length > 0) {
              const errMsg = response.data.details.map(
                (error: { msg: string }, index: number) => (
                  <div key={index}>{error?.msg}</div>
                )
              );
              Notification("error", errMsg);
            } else {
              Notification("error", response?.data?.msg);
            }
            break;
          case 512:
            // handle error
            Notification("error", response?.data?.msg);
            // LocalStorage.removeToken();
            // window.location.reload();
            break;
          default:
            Notification("error", response?.data?.msg);
            break;
        }
      }

      if (response.data.msg === "jwt malformed") {
        LocalStorage.removeToken();
        window.location.reload();
      }
      // cover response to camelCase
      return response.data;
    }

    return response;
  },
  (error) => {
    // Handle errors
    error?.response?.data?.msg &&
      Notification("error", error?.response?.data?.msg);
    return error;
  }
);

export default AxiosClient;
