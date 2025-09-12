import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card } from "@/components/ui/card";

function MainLayout() {
  const [collapsed, setCollapsed] = useState(true);

  return (
    <div className="w-full h-screen flex relative">
      <aside className="transition-all duration-300 ease-out">
        <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
      </aside>

      <main className="flex-1 flex flex-col">
        <Navbar />

        <ScrollArea className="flex-1 p-4">
          <div className="w-full h-full p-4">
            <Outlet />
          </div>
        </ScrollArea>
      </main>
    </div>
  );
}

export default MainLayout;
