export const checkTokenExpiration = () => {
  const expirationTime = localStorage.getItem("tokenExpiration");

  if (expirationTime && new Date().getTime() > expirationTime) {
    localStorage.removeItem("token");
    localStorage.removeItem("tokenExpiration");
  }
};
