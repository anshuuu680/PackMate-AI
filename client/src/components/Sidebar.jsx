import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Menu, X, Home, MessageSquare, BarChart3 } from "lucide-react";

const links = [
  { name: "Home", href: "/", icon: <Home size={18} /> },
  { name: "SMS Tool", href: "/sms-tool", icon: <MessageSquare size={18} /> },
  { name: "Dashboard", href: "/dashboard", icon: <BarChart3 size={18} /> },
];

function Sidebar() {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex">
      <div className="lg:hidden w-full h-16 flex items-center justify-between px-4 bg-secondary text-gray-300 border-b border-gray-600 shadow-md">
        <span className="text-lg font-bold tracking-wide">Logo</span>
        <button
          className="text-gray-300 hover:text-white transition"
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      <div
        className={`
          fixed top-0 left-0 h-screen w-48 bg-secondary text-gray-300 flex flex-col shadow-xl border-r border-gray-700 transform transition-transform duration-300 z-50
          ${open ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0 lg:static lg:flex
        `}
      >
        {/* Logo/Header */}
        <div className="h-16 flex items-center justify-center border-b border-gray-700 font-bold text-xl tracking-wide text-white">
          <span>Embedly</span>
        </div>

        {/* Nav Links */}
        <div className="flex flex-col gap-2 w-full mt-8 px-2">
          {links.map((link) => (
            <NavLink
              key={link.name}
              to={link.href}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 
                ${
                  isActive
                    ? "bg-primary text-gray-600 shadow-md scale-[1.02]"
                    : "hover:bg-primary/80 hover:text-gray-700 hover:scale-[1.02]"
                }`
              }
              onClick={() => setOpen(false)}
            >
              {link.icon}
              <span>{link.name}</span>
            </NavLink>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
