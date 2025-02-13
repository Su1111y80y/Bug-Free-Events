/**
 * Service for managing authentication tokens
 * Provides methods for storing, retrieving, and validating auth tokens
 */
export const tokenService = {
  /**
   * Retrieves the stored authentication token
   * @returns {string|null} The stored token or null if not found
   */
  getToken: () => {
    return localStorage.getItem("authToken");
  },

  /**
   * Stores the authentication token
   * @param {string} token JWT authentication token
   */
  setToken: (token) => {
    localStorage.setItem("authToken", token);
  },

  /**
   * Removes the stored authentication token
   * Used for logging out or token invalidation
   */
  removeToken: () => {
    localStorage.removeItem("authToken");
  },

  /**
   * Checks if user is authenticated
   * @returns {boolean} True if valid token exists
   */
  isAuthenticated: () => {
    return !!localStorage.getItem("authToken");
  },
};
