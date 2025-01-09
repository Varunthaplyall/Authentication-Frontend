import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-blue-50">
      <h1 className="text-4xl font-bold text-gray-700 mb-4">
        Welcome to the page
      </h1>
      <button
        className="bg-blue-500 text-white rounded-md px-4 py-2 hover:bg-blue-600 transition"
        onClick={handleLogout}
      >
        Logout
      </button>
    </div>
  );
};

export default Home;
