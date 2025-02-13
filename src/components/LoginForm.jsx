import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { authService } from "../services/auth.service";
import { tokenService } from "../services/token.service";

const LoginForm = () => {
  // Navigation hook for redirecting after successful login
  const navigate = useNavigate();

  // Form state management
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // Error handling and form validation states
  const [error, setError] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);

  // Validate form whenever inputs change
  useEffect(() => {
    const isValid = formData.email.length > 0 && formData.password.length >= 8;

    setIsFormValid(isValid);
  }, [formData]);

  /**
   * Validates form data before submission
   * @returns {boolean} Whether the form is valid
   */
  const validateForm = () => {
    if (formData.password.length < 8) {
      setError("Password must be at least 8 characters long");
      return false;
    }
    setError("");
    return true;
  };

  /**
   * Handles form submission
   * Validates form, attempts login, and handles success/failure
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const response = await authService.login(formData);
      tokenService.setToken(response.token);

      toast.success("Login successful!");
      navigate("/");
    } catch (error) {
      setError(error.message || "Login failed. Please try again.");
      toast.error("Login failed. Please check your credentials.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <h2 className="text-2xl font-bold text-center mb-8">Welcome Back</h2>

      {error && (
        <div className="alert alert-error">
          <span>{error}</span>
        </div>
      )}

      <div className="form-control w-full">
        <label className="label">
          <span className="label-text">Email</span>
        </label>
        <input
          type="email"
          placeholder="your@email.com"
          className="input input-bordered w-full"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          required
        />
      </div>

      <div className="form-control w-full">
        <label className="label">
          <span className="label-text">Password</span>
        </label>
        <input
          type="password"
          placeholder="Enter your password (min. 8 characters)"
          className={`input input-bordered w-full ${
            error.includes("Password") ? "input-error" : ""
          }`}
          value={formData.password}
          onChange={(e) => {
            setFormData({ ...formData, password: e.target.value });
            if (error) setError("");
          }}
          required
          minLength={8}
        />
        <label className="label">
          <a href="#" className="label-text-alt link link-hover">
            Forgot password?
          </a>
        </label>
      </div>

      <button
        type="submit"
        className="btn btn-primary w-full"
        disabled={!isFormValid}
      >
        Sign In
      </button>
    </form>
  );
};

export default LoginForm;
