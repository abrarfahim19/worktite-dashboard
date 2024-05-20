"use server";

import { apiPost, apiRoutes } from "@/config/common";
import { jwtVerify, SignJWT } from "jose";
import { cookies } from "next/headers";
// import { cookies } from "next/headers";

const secretKey = "mySupersecretKey";
const key = new TextEncoder().encode(secretKey);
const JWT_ALGORITHM = "HS256";
const EXPIRATION_TIME = "10d from now";

export const encrypt = async (payload: any) => {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: JWT_ALGORITHM })
    .setIssuedAt()
    .setExpirationTime(EXPIRATION_TIME)
    .sign(key);
};

export const decrypt = async (token: string) => {
  if (!token) {
    return null;
  }
  const { payload } = await jwtVerify(token, key, {
    algorithms: [JWT_ALGORITHM],
  });
  return payload;
};

interface LoginInput {
  email: string;
  password: string;
}

export const login = async (loginInput: LoginInput) => {
  const user = {
    email: loginInput.email,
    password: loginInput.password,
  };

  // if (user.email === "admin@email.com" && user.password === "admin") {
  //   // Create the session:
  //   const expires = new Date(Date.now() + 10 * 1000);
  //   const session = await encrypt({ user, expires });

  //   // Save the session in the cookie:
  //   setCookie("session", session, { expires, httpOnly: true }); // Set the session and expire with the expires time and httpOnly to true: This doesn't allow the client side to access the cookie.
  //   console.log("Logged in");
  // } else {
  //   console.log("Invalid credentials");
  // }
  try {
    const response = await apiPost(apiRoutes.AUTH.LOGIN, user);
    console.log(loginInput, response.status, response.data);
    if (response.status === 200) {
      cookies().set("accessToken", response.data.accessToken);
      cookies().set("refreshToken", response.data.refreshToken);
      const encryptedUser = await encrypt(response.data.user);
      cookies().set("user", encryptedUser);
      console.log("User Data", response.data.user);
    }
  } catch (error) {
    if (error.isAxiosError) {
      console.log(
        "Error from server axios error logging in",
        error.response?.status,
        "AXIOS ERROR: ",
        error.isAxiosError,
      );
      throw error;
    }
  }
};

export const logout = async () => {
  // Destroy the session:
  cookies().set("user", "", { expires: new Date(0) });
  cookies().set("accessToken", "", { expires: new Date(0) });
  cookies().set("refreshToken", "", { expires: new Date(0) });
};

// export const getSession = async () => {
//   const sessionJWT = cookies().get("session")?.value;
//   if (!sessionJWT) {
//     return null;
//   }
//   console.log("Session JWT", sessionJWT, decrypt(sessionJWT));
//   return decrypt(sessionJWT);
// };

export const getUserData = async () => {
  const userRaw = cookies().get("user")?.value;
  if (!userRaw) {
    return null;
  }
  return decrypt(userRaw);
};
