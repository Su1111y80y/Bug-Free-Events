import { useState, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router";
import LoginForm from "../components/LoginForm";
import SignupForm from "../components/SignupForm";
import AlreadyLoggedIn from "../components/AlreadyLoggedIn";
import { tokenService } from "../services/token.service";

const LoginPage = () => {
  const location = useLocation();
  const [isLoginView, setIsLoginView] = useState(location.state?.isLogin !== false);
  const [lastRegisteredEmail, setLastRegisteredEmail] = useState("");
  const isAuthenticated = tokenService.getToken();

  useEffect(() => {
    setIsLoginView(location.state?.isLogin !== false);
  }, [location.state]);

  const handleSignupSuccess = (email) => {
    setLastRegisteredEmail(email);
    setIsLoginView(true);
  };

  if (isAuthenticated) {
    return <AlreadyLoggedIn />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 px-4 py-8">
      <div className="card w-full max-w-2xl bg-base-100 shadow-2xl">
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
            {isLoginView ? (
              <LoginForm initialEmail={lastRegisteredEmail} />
            ) : (
              <SignupForm onSignupSuccess={handleSignupSuccess} />
            )}
          </div>

          <div className="mt-6 text-center">
            <p className="text-base-content/70">
              {isLoginView ? "Don't have an account? " : "Already have an account? "}
              <Link
                to={isLoginView ? "/signup" : "/login"}
                className="text-primary hover:underline"
              >
                {isLoginView ? "Sign up" : "Log in"}
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
