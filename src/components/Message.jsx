import React, {useEffect} from "react";
import {useContext} from "react";
import {useRef} from "react";
import {AuthContext} from "../Context/AuthContext";
import {ChatContext} from "../Context/ChatContext";

const Message = ({isYou, message}) => {
  const ref = useRef();

  const {currentUser} = useContext(AuthContext);
  const {data} = useContext(ChatContext);

  useEffect(() => {
    ref.current?.scrollIntoView({behavior: "smooth"});
  }, [message]);

  console.log(message.date.toDate());
  return (
    <div className={`w-full flex ${isYou ? "justify-end" : "justify-start"}`} ref={ref}>
      <div
        className={`flex w-fit items-center p-2 my-2 justify-center ${
          isYou ? "flex-row-reverse" : "flex-row"
        }`}
      >
        <div className="flex h-full">
          <img
            src={isYou ? currentUser.photoURL : data.user.photoURL}
            alt="placeholder"
            className="w-10 h-10 rounded-full m-2"
          />
        </div>
        <div className={`flex flex-col ${isYou ? "items-end" : "items-start"}`}>
          <div className="w-fit border-solid border-2 py-2 px-4 rounded-lg bg-white">
            <div className="max-w-xs text-wrap break-words">{message.text}</div>
            <div
              className={`text-xs text-slate-500 flex ${isYou ? "justify-end" : "justify-start"}`}
            >
              {message.date.toDate().getHours() + ":" + message.date.toDate().getMinutes()}
            </div>
          </div>
          {message.img && <img src={message.img} alt="" className="w-32 m-1" />}
        </div>
      </div>
    </div>
  );
};

export default Message;
