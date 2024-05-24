import { PRICINGTYPE, UserType } from "@/config/common/AppEnums";
import { jwtDecode } from "jwt-decode";
import Cookies from "universal-cookie";

// A debounced input react component

const cookies = new Cookies();

interface User {
  name: string;
  ssoid: number;
  type: UserType;
}

export const parseToken = (token: string): User | null => {
  if (token) {
    try {
      return jwtDecode(token);
    } catch (error) {
      console.error("Error decoding JWT token:", error);
    }
  }
  return null;
};

export function setCookie(name: string, value: string, options?: any) {
  const others = options
    ? { ...options }
    : { expires: new Date(Date.now() + 25892000000) };

  cookies.set(name, value, others);
}

export function getCookie(name: string) {
  return cookies.get(name);
}

export const removeCookie = (name: string) => {
  cookies.remove(name);
};

// Getting JWT tokens while running middleware
export const serverCookie = (cookieReq: any) => {
  const tokenArr: string[] = cookieReq.toString().split(/[=;]/);

  return {
    refToken: tokenArr[1],
    accToken: tokenArr[3],
  };
};

export const jsonParse = <T>(str: string) => {
  try {
    const jsonValue: T = JSON.parse(str);
    return jsonValue;
  } catch {
    return undefined;
  }
};

export const parseJWTToken = (token: string) => {
  if (token) {
    try {
      return jwtDecode(token);
    } catch (error) {
      return null;
    }
  }
  return null;
};

// Retrieve JWT token from cookies
export const getJWTToken = (cookie_name: string): string => {
  if (getCookie(cookie_name)) {
    return cookies.get(cookie_name);
  }

  return "";
};

export const debounce = (callback: (...args: any) => void, wait = 500) => {
  let timeoutId: any;
  return (...args: any) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      callback(args);
    }, wait);
  };
};

export const priceTypeConv = (type: PRICINGTYPE) => {
  if (type === PRICINGTYPE.HOURLY_BASIS) {
    return "Hourly";
  }
  if (type === PRICINGTYPE.MILESTONE_BASIS) {
    return "Milestone";
  }
  if (type === PRICINGTYPE.ONE_TIME_BASIS) {
    return "One Time Pay";
  }
  return "";
};

export const convertTimeTo12HourFormat = (timeString: string): string => {
  const [hours, minutes, seconds] = timeString.split(":");
  let period = "AM";
  let hour = parseInt(hours, 10);

  if (hour >= 12) {
    period = "PM";
    hour = hour === 12 ? 12 : hour - 12;
  }

  if (hour === 0) {
    hour = 12;
  }

  return `${hour}:${minutes}:${seconds} ${period}`;
};

export function localDateString2dbDateString(date: Date | undefined): string {
  if (!date) {
    return "";
  }
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function extractPathFromUrl(url: string): string {
  const parsedUrl = new URL(url);
  return parsedUrl.pathname + parsedUrl.search;
}

export function updateUrlQueryParameter(
  url: string,
  opts: { [key: string]: any },
): string {
  const parsedUrl = new URL(url);
  Object.entries(opts)?.forEach(([key, value]) => {
    parsedUrl.searchParams.set(key, value);
  });
  return parsedUrl.toString();
}

export const getFirstCharCapitalized = (str: string) => {
  return str.charAt(0).toUpperCase();
};

export const PLACE_HOLDER_IMAGE =
  "https://images.pexels.com/photos/3952048/pexels-photo-3952048.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1";

export const getCurrentMonth = () => {
  const date = new Date();
  const month = date.getMonth() + 1;
  return month;
};

export const getCurrentYear = () => {
  const date = new Date();
  const year = date.getFullYear();
  return year;
};

export function getTimeFromDate(timeString: string): Date {
  const date = new Date();
  const [hours, minutes, seconds] = timeString.split(":").map(Number);
  date.setHours(hours, minutes, seconds);
  return date;
}

export function second2DHMS(seconds: number): {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
} {
  const days = Math.floor(seconds / (3600 * 24));
  const hours = Math.floor((seconds % (3600 * 24)) / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;

  return { days, hours, minutes, seconds: remainingSeconds };
}

export function convertTo24Hour(
  hour: string,
  minute: string,
  meridiem: string,
) {
  let h = parseInt(hour);
  if (meridiem === "pm" && h < 12) h += 12;
  if (meridiem === "am" && h === 12) h = 0;
  console.log("Time: ", `${h.toString().padStart(2, "0")}:${minute}`);
  return `${h.toString().padStart(2, "0")}:${minute}`;
}

export const encodeDataToBase64 = (data: { [key: string]: any }): string => {
  const jsonString = JSON.stringify(data);
  return Buffer.from(jsonString).toString("base64");
};

export const decodeDataFromBase64 = (
  base64String: string,
): Record<string, any> | null => {
  try {
    const jsonString = atob(base64String);
    return JSON.parse(jsonString);
  } catch (error) {
    console.error("Failed to decode and parse data:", error);
    return null;
  }
};

export const storeMessageLocally = (
  message: string,
  chat: string | number,
  project: string | number,
): void => {
  const messages = JSON.parse(localStorage.getItem("offlineMessages") || "[]");
  messages.push({ id: Date.now(), message, is_send: false, project, chat });
  localStorage.setItem("offlineMessages", JSON.stringify(messages));
};

export const PLACE_HOLDER_COVER_IMAGE =
  "http://147.182.242.250/images/2024/05/23/coversize.png";
