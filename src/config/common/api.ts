import axiosInstance from "@/config/libs/axiosInstance";
import { AxiosRequestConfig } from "axios";

const errorHandler = (error: any) => {
  throw error;
};
// const errorHandler = (error: any) => {
//   if (error.response) {
//     // The request was made and the server responded with a status code
//     // that falls out of the range of 2xx
//     console.error(error.response.data);
//     console.error(error.response.status);
//     console.error(error.response.headers);
//     return {
//       error: true,
//       message: error.response.data,
//       status: error.response.status,
//     };
//   } else if (error.request) {
//     // The request was made but no response was received
//     console.error(error.request);
//     return {
//       error: true,
//       message: "No response received",
//       status: "No response",
//     };
//   } else {
//     // Something happened in setting up the request that triggered an Error
//     console.error("Error", error.message);
//     return {
//       error: true,
//       message: error.message,
//       status: "Request setup error",
//     };
//   }
// };

async function apiGet<T = any>(
  apiPath: string,
  config: AxiosRequestConfig = {},
) {
  try {
    const response = await axiosInstance.get(apiPath, config);
    return response;
  } catch (error) {
    return errorHandler(error);
  }
}

async function apiPost<R = any, T = any>(
  apiPath: string,
  data?: R,
  config: AxiosRequestConfig = {},
) {
  try {
    const response = await axiosInstance.post(apiPath, data, config);
    return response;
  } catch (error) {
    return errorHandler(error);
  }
}

async function apiDelete<T = any>(
  apiPath: string,
  config: AxiosRequestConfig = {},
) {
  try {
    const response = await axiosInstance.delete(apiPath, config);
    return response;
  } catch (error) {
    return errorHandler(error);
  }
}

async function apiPut<R = any, T = any>(apiPath: string, data?: R) {
  try {
    const response = await axiosInstance.put(apiPath, data);
    return response;
  } catch (error) {
    return errorHandler(error);
  }
}

async function apiPatch<R = any, T = any>(apiPath: string, data?: R) {
  try {
    const response = await axiosInstance.patch(apiPath, data);
    return response;
  } catch (error) {
    return errorHandler(error);
  }
}

export { apiDelete, apiGet, apiPatch, apiPost, apiPut };
