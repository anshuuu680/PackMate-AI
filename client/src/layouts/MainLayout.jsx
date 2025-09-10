import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

function MainLayout() {
  const [collapsed, setCollapsed] = useState(true);

  return (
    <div className="w-full h-screen bg-primary flex relative">
      <aside className="transition-all duration-300 ease-out">
        <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
      </aside>

      <main className="flex-1 flex flex-col">
        <Navbar />
        <div className="flex-1 overflow-y-auto p-4">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

export default MainLayout;
