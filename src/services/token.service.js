export const tokenService = {
  getToken: () => {
    return localStorage.getItem("authToken");
  },

  setToken: (token) => {
    localStorage.setItem("authToken", token);
  },

  removeToken: () => {
    localStorage.removeItem("authToken");
  },

  isAuthenticated: () => {
    return !!localStorage.getItem("authToken");
  },
};
