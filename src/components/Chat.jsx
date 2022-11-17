import {doc, onSnapshot} from "firebase/firestore";
import React, {useContext, useEffect, useState} from "react";
import {ChatContext} from "../Context/ChatContext";
import {AuthContext} from "../Context/AuthContext";
import {db} from "../firebase";
import Message from "./Message";
const Chat = () => {
  const [messages, setMessages] = useState([]);
  const {data} = useContext(ChatContext);
  const {currentUser} = useContext(AuthContext);

  useEffect(() => {
    const unsub = onSnapshot(doc(db, "chats", data.chatId), (doc) => {
      if (doc.exists()) {
        setMessages(doc.data().messages);
      }
    });
    return () => {
      unsub();
    };
  }, [data.chatId]);

  return (
    <div className="flex flex-col p-3 bg-indigo-50 scrollbar-none overflow-y-scroll h-96">
      {messages.map((mess, index) => (
        <Message isYou={mess.senderId === currentUser.uid} message={mess} key={index} />
      ))}
    </div>
  );
};

export default Chat;
