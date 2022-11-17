import React from "react";

const SearchUser = ({UserData, handleAdd}) => {
  return (
    <div
      className="h-16 bg-indigo-900 p-2 flex justify-center items-center cursor-pointer hover:bg-indigo-700 transition"
      onClick={() => handleAdd(UserData)}
    >
      <div className="flex items-center justify-center w-1/5">
        <img src="/avatar.jpg" alt="" className="h-10 w-10 rounded-full" />
      </div>
      <div className="flex justify-center flex-col w-4/5 px-2 text-white">
        <div className="text-white font-bold">{UserData.displayName}</div>
        <div className="text-slate-200 text-sm">{UserData?.lastMessage || "No message"}</div>
      </div>
    </div>
  );
};

export default SearchUser;
