import React, { useEffect, useState } from "react";
import { MdOutlineMail, MdNotifications } from "react-icons/md";

const AppBar = ({ selectedMenu }) => {
  const [loggedInUser, setLoggedInUser] = useState("");

  useEffect(() => {
    const storedUser = localStorage.getItem("loggedInUser");
    setLoggedInUser(storedUser || "User");
  }, []);

  const getInitials = (name = "") => {
    const words = name.trim().split(" ");
    return words.map((word) => word[0]?.toUpperCase()).join("");
  };

  return (
    <div className="w-full flex justify-between items-center px-4 sm:px-6 py-3 bg-white fixed top-0 left-0 right-0 z-30 shadow-md">
      <div className="text-lg font-semibold text-gray-700 truncate">
        {selectedMenu || "Dashboard"}
      </div>

      <div className="flex items-center gap-5">
        <MdOutlineMail className="text-gray-500 text-2xl cursor-pointer" />
        <MdNotifications className="text-gray-500 text-2xl cursor-pointer" />

        <div className="flex items-center gap-2">
          <div className="w-10 h-10 flex items-center justify-center bg-blue-600 text-white rounded-full font-bold text-sm">
            {getInitials(loggedInUser)}
          </div>
         
        </div>
      </div>
    </div>
  );
};

export default AppBar;
