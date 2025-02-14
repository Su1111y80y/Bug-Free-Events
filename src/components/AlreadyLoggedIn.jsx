import { Link, useNavigate } from "react-router";
import { tokenService } from "../services/token.service";
import { toast } from "react-toastify";

const AlreadyLoggedIn = () => {
  const user = tokenService.getUser();
  const navigate = useNavigate();

  const handleLogout = () => {
    try {
      tokenService.clearAuth();
      toast.success("Logged out successfully");
      navigate("/login");
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("Error during logout");
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 text-center">
      <h2 className="text-2xl font-bold mb-4">Already Logged In</h2>
      <p className="mb-4 text-base-content/70">
        You are already logged in as <strong>{user?.email}</strong>
      </p>
      <div className="space-y-4">
        <Link to="/" className="btn btn-primary w-full">
          Go to Homepage
        </Link>
        <button onClick={handleLogout} className="btn btn-outline w-full">
          Log Out
        </button>
      </div>
    </div>
  );
};

export default AlreadyLoggedIn;
