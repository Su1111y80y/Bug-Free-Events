import { API_BASE_URL } from "./config";

export const authService = {
  /**
   * Authenticates user with provided credentials
   * @param {Object} credentials - User login credentials
   * @param {string} credentials.email - User's email
   * @param {string} credentials.password - User's password
   * @returns {Promise<{token: string, user: Object}>} Authentication data
   * @throws {Error} If login fails
   */
  login: async (credentials) => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Login failed");

      // Ensure we have a token in the response
      if (!data.token) throw new Error("No authentication token received");

      return data;
    } catch (error) {
      throw new Error(`Authentication failed: ${error.message}`);
    }
  },

  /**
   * Fetches user profile data
   * @param {string} token - JWT authentication token
   * @returns {Promise<Object>} User profile data
   * @throws {Error} If profile fetch fails
   */
  getProfile: async (token) => {
    if (!token) throw new Error("Authentication token is required");

    try {
      const response = await fetch(`${API_BASE_URL}/auth/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      if (!response.ok)
        throw new Error(data.message || "Failed to fetch profile");
      return data;
    } catch (error) {
      throw new Error(`Failed to fetch profile: ${error.message}`);
    }
  },

  /**
   * Registers a new user
   * @param {Object} userData - User registration data
   * @param {string} userData.email - User's email
   * @param {string} userData.password - User's password
   * @returns {Promise<Object>} Created user data
   * @throws {Error} If registration fails
   */
  register: async (userData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (!response.ok) {
        if (response.status === 409) {
          throw new Error("User already exists");
        }
        throw new Error(data.error || "Registration failed");
      }

      return data;
    } catch (error) {
      throw error;
    }
  },
};
