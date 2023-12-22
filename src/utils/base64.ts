export const encodeBase64 = (value: any) => Buffer.from(JSON.stringify(value)).toString("base64");
export const decodeBase64 = (encode: string) => Buffer.from(encode, "base64").toString("ascii");
