import {getJWTToken, setCookie} from "@/config/common/functions";
import axios from "axios";
import {jwtTokens} from "@/config/common/AppEnums";
import {apiRoutes} from "@/config/common/apiRoutes";
import {config} from "@/config/common/appConfig";

interface IRefreshToken {
    accessToken: string;
    refreshToken: string;
}

const refreshAccessToken = async () => {
    const refresh_token = getJWTToken(jwtTokens.USER_REFRESH_TOKEN);
    if (refresh_token) {
        try {
            const response = await axios.post<IRefreshToken>(
                `${config.BASE_URL}${apiRoutes.AUTH.REFRESH_TOKEN}`,
                {refresh: refresh_token},
            );
            setCookie(jwtTokens.USER_ACCESS_TOKEN, response.data.accessToken);
            setCookie(jwtTokens.USER_REFRESH_TOKEN, response.data.refreshToken);
            return response.data.accessToken;
        } catch (error) {
            // eslint-disable-next-line no-console
            console.error(error);
            // window.location.href = frontendRoute.PUBLIC.LOGIN;
            throw error; // Make sure to rethrow the error after handling it
        }
    }
};

export const axiosInstance = axios.create({
    baseURL: `${config.BASE_URL}`,
    headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
    },
    timeout: 30000,
});

axiosInstance.interceptors.request.use(
    (config) => {
        const accessToken = getJWTToken(jwtTokens.USER_ACCESS_TOKEN);
        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    },
);
axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        // 401 Unauthorized
        const originalRequest = error.config;
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            try {
                originalRequest.headers.Authorization =
                    await refreshAccessToken();
                return axiosInstance(originalRequest);
            } catch (error) {
                // eslint-disable-next-line no-console
                return Promise.reject(error);
            }
        }
        throw error;
    },
);

export default axiosInstance;
