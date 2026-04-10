export function generateRandomEmail() {
  const emailLogin = "-olena123";
  const emailAt = "@gmail.com";
  return emailLogin + Math.random().toString(36).substring(2, 10) + emailAt;
}
