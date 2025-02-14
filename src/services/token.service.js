/**
 * Service for managing authentication tokens
 * Provides methods for storing, retrieving, and validating auth tokens
 */
export const tokenService = {
  /**
   * Stores the authentication token
   * @param {string} token JWT authentication token
   */
  setToken: (token) => {
    localStorage.setItem("token", token);
  },

  /**
   * Retrieves the stored authentication token
   * @returns {string|null} The stored token or null if not found
   */
  getToken: () => {
    return localStorage.getItem("token");
  },

  /**
   * Stores the user information
   * @param {Object} user User information object
   */
  setUser: (user) => {
    localStorage.setItem("user", JSON.stringify(user));
  },

  /**
   * Retrieves the stored user information
   * @returns {Object|null} The stored user information or null if not found
   */
  getUser: () => {
    const userStr = localStorage.getItem("user");
    try {
      return userStr ? JSON.parse(userStr) : null;
    } catch {
      return null;
    }
  },

  /**
   * Clears the stored authentication token and user information
   * Used for logging out or account deletion
   */
  clearAuth: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  },
};
