import {AxiosRequestConfig, AxiosResponse} from "axios";
import axiosInstance from "@/config/libs/axiosInstance";


const errorHandler = (error: any) => {
    throw error;
};

async function apiGet<T = any>(apiPath: string, config: AxiosRequestConfig = {}) {
    try {
    const response = await axiosInstance
      .get(apiPath, config);
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
    const response = await axiosInstance
      .post(apiPath, data, config);
    return response;
  } catch (error) {
    return errorHandler(error);
  }
}

async function apiDelete<T = any>(apiPath: string, config: AxiosRequestConfig = {}) {
    try {
    const response = await axiosInstance
      .delete(apiPath, config);
    return response;
  } catch (error) {
    return errorHandler(error);
  }
}

async function apiPut<R = any, T = any>(apiPath: string, data?: R) {
    try {
    const response = await axiosInstance
      .put(apiPath, data);
    return response;
  } catch (error) {
    return errorHandler(error);
  }
}

async function apiPatch<R = any, T = any>(apiPath: string, data?: R) {
    try {
    const response = await axiosInstance
      .patch(apiPath, data);
    return response;
  } catch (error) {
    return errorHandler(error);
  }
}

export {apiGet, apiPost, apiDelete, apiPut, apiPatch};
