import { useState } from "react";
import { useNavigate } from "react-router";
import { FaUser, FaSignOutAlt, FaTrash } from "react-icons/fa";
import { tokenService } from "../services/token.service";
import { authService } from "../services/auth.service";
import { toast } from "react-toastify";

const ProfileMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const user = tokenService.getUser() || { email: "User" };

  const handleLogout = () => {
    try {
      tokenService.clearAuth();
      toast.success("Logged out successfully");
      navigate("/");
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("Error during logout");
    } finally {
      setIsOpen(false);
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm("Are you sure you want to delete your account? This cannot be undone.")) {
      try {
        const token = tokenService.getToken();
        if (!token) throw new Error("No authentication token found");

        await authService.deleteAccount(token);
        tokenService.clearAuth();
        toast.success("Account deleted successfully");
        navigate("/");
      } catch (error) {
        console.error("Delete account error:", error);
        toast.error(error.message || "Failed to delete account");
      } finally {
        setIsOpen(false);
      }
    }
  };

  return (
    <div className="relative">
      <button onClick={() => setIsOpen(!isOpen)} className="btn btn-ghost btn-circle avatar">
        <FaUser className="h-5 w-5" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-base-100 rounded-lg shadow-xl z-50">
          <div className="p-2 text-sm">
            <div className="px-4 py-2 text-base-content/70">{user?.email}</div>

            <hr className="my-2 border-base-300" />

            <button
              onClick={handleLogout}
              className="w-full px-4 py-2 text-left hover:bg-base-200 rounded-lg flex items-center gap-2"
            >
              <FaSignOutAlt className="h-4 w-4" />
              Logout
            </button>

            <hr className="my-2 border-base-300" />

            <button
              onClick={handleDeleteAccount}
              className="w-full px-4 py-2 text-left text-error hover:bg-base-200 rounded-lg flex items-center gap-2"
            >
              <FaTrash className="h-4 w-4" />
              Delete Account
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileMenu;
