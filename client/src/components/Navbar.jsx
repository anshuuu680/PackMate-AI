import { useState, useRef, useEffect } from "react";
import { LogOut, User, Bell } from "lucide-react";
import UpdateProfileModal from "./UpdateProfile";

function Navbar() {
  const [open, setOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [profileModal, setProfileModal] = useState(false);
  const dropdownRef = useRef(null);
  const notifRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
      if (notifRef.current && !notifRef.current.contains(event.target)) {
        setNotifOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      <div className="w-full h-12 border-b border-gray-200 bg-white shadow-md flex items-center justify-end px-4 sm:px-6 relative gap-4">
        {/* Notification */}
        <div className="relative" ref={notifRef}>
          <button
            onClick={() => setNotifOpen(!notifOpen)}
            className="relative p-2 rounded-full hover:bg-gray-100 transition"
          >
            <Bell size={20} className="text-gray-600" />
            {/* Badge */}
            <span className="absolute top-1 right-1 block h-2 w-2 rounded-full bg-red-500"></span>
          </button>

          {notifOpen && (
            <div className="absolute right-0 mt-2 w-64 bg-white border border-gray-200 rounded-sm shadow-lg overflow-hidden animate-fadeIn">
              <div className="p-3 text-sm text-gray-700 border-b">
                Notifications
              </div>
              <div className="max-h-60 overflow-y-auto">
                <div className="px-4 py-2 text-sm hover:bg-gray-50 cursor-pointer">
                  🎉 Your trip was created successfully!
                </div>
                <div className="px-4 py-2 text-sm hover:bg-gray-50 cursor-pointer">
                  👕 New outfit suggestion available.
                </div>
                <div className="px-4 py-2 text-sm hover:bg-gray-50 cursor-pointer">
                  📦 Order #1234 has been shipped.
                </div>
              </div>
              <div className="p-2 text-center text-xs text-blue-600 hover:underline cursor-pointer border-t">
                View all
              </div>
            </div>
          )}
        </div>

        {/* Profile */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setOpen(!open)}
            className="w-8 h-8  rounded-full border overflow-hidden shadow hover:shadow-md transition cursor-pointer"
          >
            <img
              className="w-full h-full object-cover"
              src="https://plus.unsplash.com/premium_photo-1671656349076-0a8ebbb706fa?w=800&auto=format&fit=crop&q=60"
              alt="Profile"
            />
          </button>

          {open && (
            <div className="absolute right-0 mt-2 w-44 bg-white border border-gray-200 rounded-sm shadow-lg overflow-hidden animate-fadeIn">
              <button
                className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition"
                onClick={() => {
                  setOpen(false);
                  setProfileModal(true);
                }}
              >
                <User size={16} /> My Profile
              </button>
              <button
                className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition"
                onClick={() => {
                  setOpen(false);
                  console.log("Logout clicked");
                }}
              >
                <LogOut size={16} /> Logout
              </button>
            </div>
          )}
        </div>
      </div>

      <UpdateProfileModal
        isOpen={profileModal}
        onClose={() => setProfileModal(false)}
      />
    </>
  );
}

export default Navbar;
