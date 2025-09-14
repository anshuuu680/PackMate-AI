import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/common/Sidebar";
import Navbar from "../components/common/Navbar";
import { ScrollArea } from "@/components/ui/scroll-area";

function MainLayout() {
  const [collapsed, setCollapsed] = useState(true);

  return (
    <div className="w-full h-screen flex relative">
      <aside className="transition-all duration-300 ease-out">
        <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
      </aside>

      <main className="flex-1 flex flex-col">
        <Navbar />

        <ScrollArea className="flex-1">
          <Outlet />
        </ScrollArea>
      </main>
    </div>
  );
}

export default MainLayout;
