export const frontendLinks = Object.freeze({
  HOME: "/",
  LINK_SIGNUP: "/signup",
  LOGIN: "/login",
  SIMPLE_PROJECT: "/simpleproject",
  COMPLEX_PROJECT: "/complexproject",
  LOGOUT: "/logout",
  PROTECTED: {
    PROFILE: "/profile",
  },
  PRIVATE: {
    DASHBOARD: "/dashboard",
    MESSAGE: (chat: string) => `/dashboard/message?chat=${chat}`,
    CREATE_AN_OFFER: (searchString: string) =>
      `/dashboard/message/createOffer?${searchString}`,
    CHAT: (chat: string) => `?chat=${chat}`,
    CALENDER: "/dashboard/calender",
  },
});

export const constants = Object.freeze({
  JWT_TOKEN_KEY: "jwt_token",
  JWT_REFRESH_TOKEN_KEY: "jwt_token",
});
