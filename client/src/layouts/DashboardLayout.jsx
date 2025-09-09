import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

function DashboardLayout() {
  const [collapsed, setCollapsed] = useState(true);

  return (
    <div className="w-full h-screen bg-primary flex relative">
      <aside className={`transition-all duration-300 ease-out`}>
        <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
      </aside>

      <main className="flex-1 transition-all">
        <Navbar />
        <Outlet />
      </main>
    </div>
  );
}

export default DashboardLayout;
