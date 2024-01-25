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
