import { useState } from "react";
import { LogOut, User, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { ModeToggle } from "./mode-toggle";
import UpdateProfileModal from "./UpdateProfile";
import LogoutModal from "../common/LogoutModal";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

function Navbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [profileModal, setProfileModal] = useState(false);
  const [logoutModal, setLogoutModal] = useState(false);

  const handleLogout = () => {
    localStorage.clear();
    dispatch({ type: "RESET_STORE" });
    navigate("/auth/login");
    setLogoutModal(false);
  };

  return (
    <>
      <div className="w-full h-12 border-b bg-surface shadow-sm flex items-center justify-end px-4 sm:px-6 gap-4">
        <ModeToggle />

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="relative">
              <Bell size={20} />
              <span className="absolute top-1 right-1 block h-2 w-2 rounded-full bg-destructive"></span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-64">
            <div className="p-3 text-sm text-foreground/80 border-b">
              Notifications
            </div>
            <div className="max-h-60 overflow-y-auto">
              <DropdownMenuItem className="cursor-default">
                🎉 Your trip was created successfully!
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-default">
                👕 New outfit suggestion available.
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-default">
                📦 Order #1234 has been shipped.
              </DropdownMenuItem>
            </div>
            <DropdownMenuItem className="text-center text-xs text-primary hover:underline border-t">
              View all
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="w-8 h-8 p-0 rounded-full overflow-hidden"
            >
              <img
                src="https://plus.unsplash.com/premium_photo-1671656349076-0a8ebbb706fa?w=800&auto=format&fit=crop&q=60"
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-44">
            <DropdownMenuItem
              onClick={() => setProfileModal(true)}
              className="flex items-center gap-2"
            >
              <User size={16} /> My Profile
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => setLogoutModal(true)}
              className="flex items-center gap-2 text-destructive"
            >
              <LogOut size={16} /> Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <UpdateProfileModal
        isOpen={profileModal}
        onClose={() => setProfileModal(false)}
      />

      <LogoutModal
        isOpen={logoutModal}
        onConfirm={handleLogout}
        onCancel={() => setLogoutModal(false)}
      />
    </>
  );
}

export default Navbar;
