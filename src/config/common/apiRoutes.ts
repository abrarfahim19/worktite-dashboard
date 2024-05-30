import { PUBLIC_API_BASE_URL } from "./envConstants";

export interface IQueryParams {
  limit?: number;
  offset?: number;
  expand?: string;
  fields?: string;
  [key: string]: any;
}

export const addQueryParams =
  (route: string) =>
  (queryParams: IQueryParams = { limit: 10, offset: 0 }) => {
    let modifiedUrl = route;
    if (route.slice(-1) === "/") {
      modifiedUrl = route.slice(0, -1);
    }
    const queryString = `/?${Object.entries(queryParams)
      .map(([key, value], index) =>
        index === 0 ? `${key}=${value}` : `&${key}=${value}`,
      )
      .join("")}`;
    return `${modifiedUrl}${queryString}`;
  };

export function getFullUrl(path: string) {
  return PUBLIC_API_BASE_URL.concat("/", path);
}

const PUBLIC_ROUTE = PUBLIC_API_BASE_URL + "/public";
const PROTECTED_ROUTE = PUBLIC_API_BASE_URL + "/protected";
const PRIVATE_ROUTE = PUBLIC_API_BASE_URL + "/private";

export const apiRoutes = Object.freeze({
  API_BASE_SERVICE_PATH: PUBLIC_API_BASE_URL,
  AUTH: {
    USER_PROFILE: addQueryParams("/auth/api/profile/"),
    USER_PROFILE_UPDATE: `/auth/api/profile/`,
    LOGIN: "/auth/api/signin/",
    SIGN_UP: "/auth/api/signup/",
    REFRESH_TOKEN: "/auth/api/token/refresh/",
    BLACK_LIST: "/auth/api/token/blacklist-custom/",
  },
  FILES: {
    IMAGES: {
      LIST: addQueryParams(`/files/images/`),
      POST: `/files/images/`,
      DELETE: (id: number) => `/files/images/${id}/`,
    },
    DOCUMENTS: {
      LIST: addQueryParams("/files/files/"),
      POST: "/files/files/",
      DELETE: (id: number) => `/files/files/${id}/`,
    },
  },
  PUBLIC: {
    PROJECTS: {
      LIST: addQueryParams("/projects/api/v1/public/projects/"),
    },
    APPOINTMENT: {
      CREATE: "/general/api/v1/public/appointments/",
      SLOTS: addQueryParams("/general/api/v1/public/appointment/slots/"),
    },
    PUBLISH_PROJECT: {
      LIST: addQueryParams("/projects/api/v1/public/publish-projects/"),
    },
  },
  PRIVATE: {
    PROJECTS: {
      LIST: addQueryParams("/projects/api/v1/private/projects/"),
      PROJECT: (projectId: string) =>
        `/projects/api/v1/private/projects/${projectId}/`,
      MILESTONE_LIST: (projectId: string) =>
        addQueryParams(
          `/projects/api/v1/private/projects/${projectId}/milestones/`,
        ),
      APPOINTMENT_LIST: (projectId: string) =>
        addQueryParams(
          `/projects/api/v1/private/projects/${projectId}/appointments/`,
        ),
      DOCUMENT_LIST: (projectId: string) =>
        addQueryParams(
          `/projects/api/v1/private/projects/${projectId}/documents/`,
        ),
    },
    MESSAGE: {
      CHATS: addQueryParams("/general/api/v1/private/chats/"),
      MESSAGES: (chatId: number | undefined) =>
        addQueryParams(`general/api/v1/private/chats/${chatId}/messages/`),
      SEND_MESSAGES: (chatId: number | undefined) =>
        `general/api/v1/private/chats/${chatId}/messages/`,
    },
  },
  PROTECTED: {
    PROJECTS: {
      GET: (projectPk: string) =>
        `/projects/api/v1/protected/projects/${projectPk}/`,
      GET_TOTAL_PROJECT: "/projects/api/v1/protected/projects_count/",
      PROJECT_STATUS_LIST_COUNT: addQueryParams(
        "/projects/api/v1/protected/project_status_count",
      ),
      LIST: addQueryParams("/projects/api/v1/protected/projects/"),
      PROJECT: {
        GET: (projectPk: string) =>
          `/projects/api/v1/protected/projects/${projectPk}/`,
      },
      CREATE: "",
      CLIENT_STATUS: {
        LIST: (projectPk: string | number) =>
          addQueryParams(
            `/projects/api/v1/protected/projects/${projectPk}/client_status/`,
          ),
        CREATE: (projectPk: string | number) =>
          `/projects/api/v1/protected/projects/${projectPk}/client_status/`,
        UPDATE: (projectPk: string | number, id: string | number) =>
          `/projects/api/v1/protected/projects/${projectPk}/client_status/${id}/`,
        DELETE: (projectPk: string | number, id: string | number) =>
          `/projects/api/v1/protected/projects/${projectPk}/client_status/${id}/`,
      },
      WORK_HISTORY: {
        LIST: (projectId: string | number) =>
          addQueryParams(
            `/projects/api/v1/protected/projects/${projectId}/work-history/`,
          ),
        GET: (projectId: string | number, id: string | number) =>
          `/projects/api/v1/protected/projects/${projectId}/work-history/${id}`,
        POST: (projectId: string | number) =>
          `/projects/api/v1/protected/projects/${projectId}/work-history/`,
        PUT: "",
      },
      INVOICE: {
        LIST: (project_pk: string | number) =>
          addQueryParams(
            `/projects/api/v1/protected/projects/${project_pk}/invoice/`,
          ),
        POST: (project_pk: string | number) =>
          `/projects/api/v1/protected/projects/${project_pk}/invoice/`,
        UPDATE: (project_pk: string | number, id: string | number) =>
          `/projects/api/v1/protected/projects/${project_pk}/invoice/${id}/`,
      },
      MEETING: {
        LIST: (project_pk: number | string) =>
          addQueryParams(
            `/projects/api/v1/protected/projects/${project_pk}/meeting/`,
          ),
        POST: (project_pk: number | string) =>
          `/projects/api/v1/protected/projects/${project_pk}/meeting/`,
      },
    },
    PUBLISH_PROJECT: {
      LIST: addQueryParams("/projects/api/v1/protected/publish-projects/"),
      POST: "/projects/api/v1/protected/publish-projects/",
      GET: (id: string | number) =>
        addQueryParams(`/projects/api/v1/protected/publish-projects/${id}/`),
    },
    CLIENTS: {
      LIST: addQueryParams("/auth/api/v1/protected/clients/"),
      CLIENT: {
        GET: (clientId: string) =>
          addQueryParams(`/auth/api/v1/protected/clients/${clientId}/`),
        CREATE: "",
        UPDATE: "",
        DELETE: "",
        PUTNOTE: (client_id: string | number) =>
          `/auth/api/v1/protected/notes/${client_id}/`,
      },
    },
    GENERAL: {
      APPOINTMENTS: {
        LIST: addQueryParams("/general/api/v1/protected/appointment/"),
        PATHCH: (id: string | number) =>
          `/general/api/v1/protected/appointment/${id}/`,
        GET: (id: string | number) =>
          `/general/api/v1/protected/appointment/${id}/`,
        DELETE: (id: string | number) =>
          `/general/api/v1/protected/appointment/${id}/`,
      },
      MEETINGS: {
        GET: (id: string | number) =>
          addQueryParams(`/general/api/v1/protected/meeting/${id}/`),
        LIST: addQueryParams("/general/api/v1/protected/meeting/"),
      },
      CHAT: {
        LIST: addQueryParams("/general/api/v1/protected/chats/"),
        POST: "/general/api/v1/protected/chats/",
        GET: (id: string | number) =>
          addQueryParams(`/general/api/v1/protected/chats/${id}/`),
        MESSAGES: {
          LIST: (chatId: string | number) =>
            addQueryParams(
              `/general/api/v1/protected/chats/${chatId}/messages/`,
            ),
          POST: (chatId: string | number) =>
            `/general/api/v1/protected/chats/${chatId}/messages/`,
        },
      },
      CALENDER: {
        APPOINTMENTS: {
          LIST: addQueryParams(
            "/general/api/v1/protected/calender/appointments/",
          ),
        },
        MEETINGS: {
          LIST: addQueryParams("/general/api/v1/protected/calender/meetings/"),
        },
      },
      PUBLISH_PROJECT: {
        LIST: addQueryParams("/projects/api/v1/protected/publish-projects/"),
        POST: "/projects/api/v1/protected/publish-projects/",
      },
    },
  },
});
