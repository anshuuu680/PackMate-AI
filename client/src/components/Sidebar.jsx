import { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  Menu,
  BarChart3,
  MessageCircle,
  Shirt,
  MapPin,
  ShoppingCart,
  Calendar,
  ClipboardList,
  X,
  Users,
} from "lucide-react";

const links = [
  { name: "Dashboard", href: "/dashboard", icon: BarChart3 },
  { name: "Chat Assistant", href: "/chat", icon: MessageCircle },
  { name: "Wardrobe", href: "/wardrobe", icon: Calendar },
  { name: "Trips", href: "/trips", icon: MapPin },
  { name: "Packing List", href: "/packing-list", icon: ClipboardList },
  { name: "Outfit Suggestions", href: "/outfits", icon: Shirt },
  { name: "Destination Tools", href: "/destination-tools", icon: MapPin },
  { name: "Group Tools", href: "/group-tools", icon: Users },
  { name: "Shop", href: "/shop", icon: ShoppingCart },
];

function Sidebar({ collapsed, setCollapsed }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="flex" style={{ fontFamily: "Work sans" }}>
      {/* Sidebar */}
      <div
        className={`
          fixed top-0 left-0 h-screen bg-white text-gray-800 flex flex-col shadow-xl border-r border-gray-200 transform transition-all duration-300 ease-out z-50
          ${collapsed ? "w-16" : "w-44"}
          ${mobileOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0 md:static
        `}
      >
        <div className="flex items-center justify-between h-12 px-4 border-b border-gray-200">
          {!collapsed && (
            <span className="text-2xl font-bold text-blue-600">PM</span>
          )}
          <button
            className="p-2 rounded-lg hover:bg-gray-100 transition-all duration-200"
            onClick={() => setCollapsed(!collapsed)}
          >
            {collapsed ? (
              <Menu size={18} className="text-gray-600" />
            ) : (
              <X size={16} className="text-gray-600" />
            )}
          </button>
        </div>

        <div className="flex flex-col mt-4 gap-1.5 px-2 flex-1">
          {links.map((link) => {
            const Icon = link.icon;
            return (
              <NavLink
                key={link.name}
                to={`/users${link.href}`}
                className={({ isActive }) =>
                  `flex items-center ${
                    collapsed ? "justify-center" : "justify-start"
                  } gap-3 p-2 rounded-lg relative group w-full cursor-pointer transition-all duration-200
                  ${
                    isActive
                      ? "bg-blue-50 text-blue-700"
                      : "hover:bg-gray-50 hover:text-gray-900"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <Icon
                      size={16}
                      className={isActive ? "text-blue-600" : "text-gray-500"}
                    />
                    {!collapsed && (
                      <span className="text-sm flex-1 text-left">
                        {link.name}
                      </span>
                    )}
                    {collapsed && (
                      <div className="absolute left-full top-1/2 transform -translate-y-1/2 ml-2 px-2 py-1 rounded bg-gray-800 text-white text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-50">
                        {link.name}
                      </div>
                    )}
                  </>
                )}
              </NavLink>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
