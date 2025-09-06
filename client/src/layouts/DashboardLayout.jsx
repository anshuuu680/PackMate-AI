import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

function DashboardLayout() {
  return (
    <div className="w-full h-screen bg-primary flex">
      <aside className="">
        <Sidebar />
      </aside>
      <main className="flex-1 h-screen overflow-y-auto bg-gray-50">
        <Navbar />
        <Outlet />
      </main>
    </div>
  );
}

export default DashboardLayout;
