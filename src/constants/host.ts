import Constants from "expo-constants";
import env from "./env";
const { manifest2, linkingUri } = Constants;

const v1 = manifest2?.extra?.expoClient?.hostUri
  ?.split(":")
  ?.shift()
  ?.concat(`:${env.SERVER_PORT}`);

console.log("====================================");
console.log(`v1`, v1);
console.log("====================================");

const v2 = linkingUri?.split(":")[1] + `:${env.SERVER_PORT}`;

export const HOST = v1 || v2;

console.log("====================================");
console.log(`v1`, v2);
console.log("====================================");

export const BASE_URL = `http://${HOST}`;
