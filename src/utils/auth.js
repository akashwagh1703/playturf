// src/utils/auth.js

export const setAuth = ({ token, role }) => {
  localStorage.setItem("auth", JSON.stringify({ token, role }));
};

export const getAuth = () => {
  const auth = localStorage.getItem("auth");
  return auth ? JSON.parse(auth) : null;
};

export const clearAuth = () => {
  localStorage.removeItem("auth");
};

export const isAuthenticated = () => {
  const auth = getAuth();
  return auth && auth.token;
};
