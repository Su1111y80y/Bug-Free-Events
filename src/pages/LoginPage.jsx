import { useState, useEffect } from "react";
import { useLocation } from "react-router";
import LoginForm from "../components/LoginForm";
import SignupForm from "../components/SignupForm";

const LoginPage = () => {
  // Get location state to determine which form to show initially
  const location = useLocation();
  // Default to login view unless explicitly set to false in navigation state
  const [isLoginView, setIsLoginView] = useState(
    location.state?.isLogin !== false
  );

  // Update view when navigation state changes
  useEffect(() => {
    // Set initial view based on navigation state
    setIsLoginView(location.state?.isLogin !== false);
  }, [location.state]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 px-4 py-8">
      <div className="card w-full max-w-2xl bg-base-100 shadow-2xl">
        {" "}
        {/* Changed from max-w-md to max-w-2xl */}
        <div className="card-body p-8">
          <div className="tabs tabs-boxed bg-base-200 p-1 mb-6">
            <button
              className={`tab flex-1 text-lg font-medium transition-all duration-200 ${
                isLoginView ? "tab-active" : ""
              }`}
              onClick={() => setIsLoginView(true)}
            >
              Sign In
            </button>
            <button
              className={`tab flex-1 text-lg font-medium transition-all duration-200 ${
                !isLoginView ? "tab-active" : ""
              }`}
              onClick={() => setIsLoginView(false)}
            >
              Sign Up
            </button>
          </div>

          <div className="transition-opacity duration-300">
            {isLoginView ? <LoginForm /> : <SignupForm />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
