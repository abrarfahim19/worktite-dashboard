import {PUBLIC_API_BASE_URL} from './envConstants';

export interface IQueryParams {
    limit?: number;
    offset?: number;

    [key: string]: any;
}

const addQueryParams =
    (route: string) =>
        (queryParams: IQueryParams = {limit: 10, offset: 0}) => {
            let modifiedUrl = route;
            if (route.slice(-1) === '/') {
                modifiedUrl = route.slice(0, -1);
            }
            const queryString = `/?${Object.entries(queryParams)
                .map(([key, value]) => `&${key}=${value}`)
                .join('')}`;
            return `${modifiedUrl}${queryString}`;
        };

export function getFullUrl(path: string) {
    return PUBLIC_API_BASE_URL.concat('/', path);
}

const PUBLIC_ROUTE = PUBLIC_API_BASE_URL + '/public';
const PROTECTED_ROUTE = PUBLIC_API_BASE_URL + '/protected';
const PRIVATE_ROUTE = PUBLIC_API_BASE_URL + '/private';

export const apiRoutes = Object.freeze({
    API_BASE_SERVICE_PATH: PUBLIC_API_BASE_URL,
    AUTH: {
        USER_PROFILE: '/auth/api/profile/',
        LOGIN: '/auth/api/signin/',
        SIGN_UP: '/auth/api/signup/',
        REFRESH_TOKEN: '/auth/api/token/refresh/',
        BLACK_LIST: '/auth/api/token/blacklist-custom/',
    },
    FILES: {
        IMAGES: `files/images/`,
    },
    PUBLIC: {
        PROJECTS: {
            LIST: addQueryParams('/projects/api/v1/public/projects/'),
        },
        APPOINTMENT: {
            CREATE: '/general/api/v1/public/appointments/',
            SLOTS: addQueryParams('/general/api/v1/public/appointment/slots/'),
        },
        PUBLISH_PROJECT: {
            LIST: addQueryParams("/projects/api/v1/public/publish-projects/")
        }
    },
    PRIVATE: {
        PROJECTS: {
            LIST: addQueryParams('/projects/api/v1/private/projects/'),
            PROJECT: (projectId: string) =>
                `/projects/api/v1/private/projects/${projectId}/`,
            MILESTONE_LIST: (projectId: string) =>
                addQueryParams(
                    `/projects/api/v1/private/projects/${projectId}/milestones/`
                ),
            APPOINTMENT_LIST: (projectId: string) =>
                addQueryParams(
                    `/projects/api/v1/private/projects/${projectId}/appointments/`
                ),
            DOCUMENT_LIST: (projectId: string) =>
                addQueryParams(
                    `/projects/api/v1/private/projects/${projectId}/documents/`
                ),
        },
        MESSAGE: {
            CHATS: addQueryParams("/general/api/v1/private/chats/"),
            MESSAGES: (chatId: number | undefined) => addQueryParams(`general/api/v1/private/chats/${chatId}/messages/`),
            SEND_MESSAGES: (chatId: number | undefined) => `general/api/v1/private/chats/${chatId}/messages/`,
        }
    },
    PROTECTED: {},
});
