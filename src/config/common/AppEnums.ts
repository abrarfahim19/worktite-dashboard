export enum UserType {
  client,
  admin,
}

export enum PROJECT_TYPE {
  SIMPLE = 1,
  COMPLEX = 2,
  ANY = 3,
}

export enum STATUS {
  PENDING = 0,
  ACTIVE = 1,
  COMPLETE = 3,
  CANCELLED,
}

export enum PRICINGTYPE {
  HOURLY_BASIS = 1,
  ONE_TIME_BASIS,
  MILESTONE_BASIS,
}

export enum DOCTYPE {
  DESIGN = 1,
  TECHNICAL = 2,
  ARCHIVE = 3,
}

export const jwtTokens = Object.freeze({
  USER_REFRESH_TOKEN: "refreshToken",
  USER_ACCESS_TOKEN: "accessToken",
});

export const localStorageData = Object.freeze({
  USER_DATA: "UserData",
});

export enum INVOICE_FILE_TYPE {
  PDF = 1,
  DOC = 2,
}
