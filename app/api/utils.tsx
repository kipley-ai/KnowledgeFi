import sha256 from "crypto-js/sha256";
import axios from "axios";
import { v4 } from "uuid";
// import { getSession } from '@auth0/nextjs-auth0';

export const axiosAPI = axios.create({
  baseURL: process.env.API_URL,
});

export const constructHeader = (headers: Headers, ignoreLoginCheck: boolean = false) => {
  const appId = process.env.APP_ID as string;
  const apiKey = process.env.API_KEY as string;
  const nowTimestamp = Math.floor(new Date().getTime() / 1000).toString();

  const userId = '' // wallet address;

  const commonHeaders = {
    "x-kb-timestamp": nowTimestamp,
    "x-kb-sign": createSign(appId + nowTimestamp + apiKey),
    "x-kb-app-id": appId,
    "x-kb-request-id": v4(),
    "x-kb-user-id": userId || "",
    "x-kb-user-sub": "",
  };

  if (ignoreLoginCheck) {
    return commonHeaders;
  }

  if (!userId) {
//    const session = await getSession();
//	if (session && session.user) {
//	  commonHeaders["x-kb-user-sub"] = session.user.user_id;
//	}
  }

  return commonHeaders;
};

const createSign = (content: string) => {
  return sha256(content).toString().toUpperCase();
};


