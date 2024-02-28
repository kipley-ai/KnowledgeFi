import axios from "axios";

export function hashUUIDToInteger(uuid: string) {
  let s = uuid.replaceAll("-", "");
  return BigInt(parseInt(s, 16));
}

export function hashUUIDToIntegerV2(uuid: string) {
  let s = uuid.replaceAll("-", "");
  let s1 = "";
  for (let i = 0; i < s.length; i++) {
    s1 += s[i].charCodeAt(0);
  }
  return parseInt(s1.substring(0, 8) + s1.substring(s1.length - 8));
}

export function generateRandomDigitInteger() {
  const min = Math.pow(10, 15);
  const max = Math.pow(10, 16) - 1;
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export const uploadFile = async (file: any, callback: any) => {
  try {
    const newFile = new FormData();
    newFile.append("input-file-upload", file);
    newFile.append("file-dir", "cover_image/nft");

    const response = await axios.post("/api/upload/s3/asset", newFile);

    if (response.status === 200) {
      const data = response.data;
      callback(data.link);
      return data;
    }
  } catch (error) {
    console.error("Error uploading file:", error);
  }
};

export const noMoreThanCharacters = (number: number) =>
  "no more than " + number + " characters";
