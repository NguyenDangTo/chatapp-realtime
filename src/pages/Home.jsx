import React from "react";
import Sidebar from "../components/Sidebar";
import Chats from "../components/Chats";

const Home = () => {
  return (
    <div className="flex items-center justify-center w-screen min-h-screen bg-indigo-400 shadow-lg p-4">
      <div className="bg-white rounded-lg w-full md:w-11/12 flex overflow-hidden">
        <Sidebar />
        <Chats />
      </div>
    </div>
  );
};

export default Home;
