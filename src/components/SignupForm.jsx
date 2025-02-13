import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { authService } from "../services/auth.service";
import Captcha from "./Captcha";

const SignupForm = () => {
  // Navigation hook for redirecting after successful registration
  const navigate = useNavigate();

  // Form state management including all required fields
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  // Validation and error handling states
  const [error, setError] = useState("");
  const [isCaptchaAttempted, setIsCaptchaAttempted] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);

  /**
   * Validates all form fields and CAPTCHA completion
   * Updates form validity state
   */
  useEffect(() => {
    const isValid =
      formData.name.length > 0 &&
      formData.email.length > 0 &&
      formData.password.length >= 8 &&
      formData.confirmPassword === formData.password &&
      isCaptchaAttempted;

    setIsFormValid(isValid);
  }, [formData, isCaptchaAttempted]);

  const validateForm = () => {
    if (formData.password.length < 8) {
      setError("Password must be at least 8 characters long");
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return false;
    }
    setError("");
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const userData = {
        email: formData.email,
        password: formData.password,
      };

      const response = await authService.register(userData);
      toast.success("Account created successfully! Please log in.");
      navigate("/login");
    } catch (error) {
      if (error.message.includes("already exists")) {
        setError("An account with this email already exists");
      } else {
        setError(error.message || "Sign up failed. Please try again.");
      }
    }
  };

  const handleCaptchaFailure = (message) => {
    setError(message);
    setIsCaptchaAttempted(true);

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleCaptchaValidityChange = (isValid) => {
    setIsCaptchaAttempted(isValid);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <h2 className="text-2xl font-bold text-center mb-8">Create Account</h2>

      {error && (
        <div className="alert alert-error">
          <span>{error}</span>
        </div>
      )}

      <div className="form-control w-full">
        <label className="label">
          <span className="label-text">Full Name</span>
        </label>
        <input
          type="text"
          placeholder="John Doe"
          className="input input-bordered w-full"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
        />
      </div>

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
          placeholder="Create a password (min. 8 characters)"
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
      </div>

      <div className="form-control w-full">
        <label className="label">
          <span className="label-text">Confirm Password</span>
        </label>
        <input
          type="password"
          placeholder="Confirm your password"
          className={`input input-bordered w-full ${
            error.includes("Password") ? "input-error" : ""
          }`}
          value={formData.confirmPassword}
          onChange={(e) => {
            setFormData({ ...formData, confirmPassword: e.target.value });
            if (error) setError("");
          }}
          required
          minLength={8}
        />
      </div>

      <Captcha
        onFailure={handleCaptchaFailure}
        onValidityChange={handleCaptchaValidityChange}
      />

      <button
        type="submit"
        className="btn btn-primary w-full"
        disabled={!isFormValid}
      >
        Create Account
      </button>

      <p className="text-xs text-center text-base-content/70 mt-2">
        * Sign up functionality is currently in development. Please use the
        login option.
      </p>
    </form>
  );
};

export default SignupForm;
