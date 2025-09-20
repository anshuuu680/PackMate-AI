import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/common/Sidebar";
import Navbar from "../components/common/Navbar";
import { ScrollArea } from "@/components/ui/scroll-area";

function MainLayout() {
  const [collapsed, setCollapsed] = useState(true);

  return (
    <div className="w-full h-screen flex">
      <aside className="transition-all duration-300 ease-out">
        <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
      </aside>

      <div className="flex-1 flex flex-col">
        <Navbar />

        <ScrollArea className="flex-1">
          <div className="">
            <Outlet />
          </div>
        </ScrollArea>
      </div>
    </div>
  );
}

export default MainLayout;
