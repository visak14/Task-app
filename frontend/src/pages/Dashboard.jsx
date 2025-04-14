import React, { useState, useEffect } from "react";
import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import { FaSignOutAlt, FaBars } from "react-icons/fa";
import { MdTask } from "react-icons/md";
import AppBar from "../components/Appbar";
import LogoutModal from "./LogoutModal";
import { handleSuccess } from "../utils";

const Dashboard = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [selectedMenu, setSelectedMenu] = useState("Dashboard");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState("");

  useEffect(() => {
    const user = localStorage.getItem("loggedInUser");
    setLoggedInUser(user || "User");
  }, []);

  useEffect(() => {
    switch (location.pathname) {
      case "/dashboard":
        setSelectedMenu("Dashboard");
        break;
      case "/dashboard/taskmanager":
        setSelectedMenu("TaskManager");
        break;
      default:
        setSelectedMenu("Dashboard");
    }
  }, [location]);

  const handleLogoutClick = () => setIsModalOpen(true);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("loggedInUser");
    handleSuccess("User Logged out");
    setIsModalOpen(false);
    setTimeout(() => {
      navigate("/");
    }, 1000);
  };

  const handleCancel = () => setIsModalOpen(false);

  return (
    <div className="h-screen flex flex-col">
      {/* Mobile header - only visible on mobile */}
      <div className="md:hidden bg-white flex justify-between items-center px-4 py-3 shadow-md">
        <button onClick={() => setSidebarOpen(!sidebarOpen)}>
          <FaBars className="text-2xl text-gray-700" />
        </button>
        <h1 className="text-xl font-bold text-purple-700">Task App</h1>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar - fixed position */}
        <aside
          className={`bg-white shadow-md fixed inset-y-0 left-0 z-40 w-60 flex flex-col justify-between p-6 transform transition-transform duration-300 ease-in-out
            ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
        >
          <div>
            <h1 className="text-xl font-bold text-purple-700">Task App</h1>
            <div className="flex justify-between items-center md:hidden mb-4">
              <button onClick={() => setSidebarOpen(false)} className="text-lg text-gray-600">
                ✕
              </button>
            </div>

            <nav className="space-y-2 my-20">
              <Link
                to="/dashboard/taskmanager"
                className={`flex items-center gap-2 text-gray-700 hover:bg-gray-100 p-2 rounded-md ${
                  selectedMenu === "TaskManager" ? "bg-purple-100 text-purple-700" : ""
                }`}
                onClick={() => setSidebarOpen(false)}
              >
                <MdTask className="text-lg" />
                Task Manager
              </Link>
            </nav>
          </div>

          <div>
            <button
              onClick={handleLogoutClick}
              className="flex items-center gap-2 text-red-600 hover:bg-gray-100 p-2 rounded-md w-full"
            >
              <FaSignOutAlt className="text-lg" />
              Logout
            </button>
          </div>
        </aside>

        {/* Main content area */}
        <div className="flex-1 flex flex-col ml-0 md:ml-60">
          {/* AppBar - stays at top */}
          <AppBar selectedMenu={selectedMenu} user={{ fullName: loggedInUser }} />
          
          {/* Scrollable content area */}
          <div className="flex-1 overflow-auto bg-gray-100">
            <div className="p-6">
              <Outlet />
            </div>
          </div>
        </div>
      </div>

      <LogoutModal
        isOpen={isModalOpen}
        onClose={handleCancel}
        onConfirm={handleLogout}
      />
    </div>
  );
};

export default Dashboard;