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

import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

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
    <TooltipProvider>
      <div className="flex">
        <div
          className={`
            fixed top-0 left-0 h-screen bg-background text-foreground flex flex-col border-r shadow-sm transition-all duration-300 ease-out z-50
            ${collapsed ? "w-16" : "w-56"}
            ${mobileOpen ? "translate-x-0" : "-translate-x-full"}
            md:translate-x-0 md:static
          `}
        >
          <div className="flex items-center justify-between h-14 px-3 border-b">
            {!collapsed && (
              <span className="text-lg font-semibold text-primary">
                ✨ PackMate
              </span>
            )}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setCollapsed(!collapsed)}
            >
              {collapsed ? <Menu size={20} /> : <X size={20} />}
            </Button>
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
                    } gap-3 rounded-md p-2 text-sm transition-colors
                    ${
                      isActive
                        ? "bg-accent text-primary"
                        : "hover:bg-accent hover:text-accent-foreground"
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      {collapsed ? (
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Icon
                              size={18}
                              className={
                                isActive
                                  ? "text-blue-300"
                                  : "text-muted-foreground"
                              }
                            />
                          </TooltipTrigger>
                          <TooltipContent side="right">
                            {link.name}
                          </TooltipContent>
                        </Tooltip>
                      ) : (
                        <>
                          <Icon
                            size={18}
                            className={
                              isActive
                                ? "text-blue-300"
                                : "text-muted-foreground"
                            }
                          />
                          <span
                            className={
                              isActive ? "text-blue-300" : "text-foreground"
                            }
                          >
                            {link.name}
                          </span>
                        </>
                      )}
                    </>
                  )}
                </NavLink>
              );
            })}
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
}

export default Sidebar;
