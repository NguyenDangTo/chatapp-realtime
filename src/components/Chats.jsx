import React, {useContext, useState} from "react";
import {BsFillCameraVideoFill, BsThreeDots} from "react-icons/bs";
import {MdAttachFile, MdSend} from "react-icons/md";
import {IoMdPersonAdd} from "react-icons/io";
import {RiImageAddFill} from "react-icons/ri";
import Chat from "./Chat";
import {ChatContext} from "../Context/ChatContext";
import {AuthContext} from "../Context/AuthContext";
import {arrayUnion, doc, serverTimestamp, Timestamp, updateDoc} from "firebase/firestore";
import {db, storage} from "../firebase";
import {v4 as uuidv4} from "uuid";
import {getDownloadURL, ref, uploadBytesResumable} from "firebase/storage";

const Chats = () => {
  const [text, setText] = useState("");
  const [img, setImg] = useState(null);

  const {data} = useContext(ChatContext);
  const {currentUser} = useContext(AuthContext);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (text === "") {
      return null;
    }
    try {
      if (img) {
        const storageRef = ref(storage, uuidv4());

        await uploadBytesResumable(storageRef, img).then(() => {
          getDownloadURL(storageRef).then(async (downloadURL) => {
            await updateDoc(doc(db, "chats", data.chatId), {
              messages: arrayUnion({
                id: uuidv4(),
                text,
                senderId: currentUser.uid,
                date: Timestamp.now(),
                img: downloadURL,
              }),
            });
          });
        });
      } else {
        await updateDoc(doc(db, "chats", data.chatId), {
          messages: arrayUnion({
            id: uuidv4(),
            text,
            senderId: currentUser.uid,
            date: Timestamp.now(),
          }),
        });
      }

      await updateDoc(doc(db, "userChats", currentUser.uid), {
        [data.chatId + ".lastMessage"]: {
          text,
        },
        [data.chatId + ".date"]: serverTimestamp(),
      });
      await updateDoc(doc(db, "userChats", data.user.uid), {
        [data.chatId + ".lastMessage"]: {
          text,
        },
        [data.chatId + ".date"]: serverTimestamp(),
      });

      setText("");
      setImg(null);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="h-full w-2/3 bg-black flex flex-col">
      <div className="flex justify-between items-center p-3 h-16 bg-indigo-600">
        <div className="text-white font-bold px-2">{data.user?.displayName}</div>
        <div className="flex justify-center items-center">
          <BsFillCameraVideoFill className="text-white text-2xl px-1 w-12 cursor-pointer transition hover:text-slate-300" />
          <IoMdPersonAdd className="text-white text-2xl px-1 w-12 cursor-pointer transition hover:text-slate-300" />
          <BsThreeDots className="text-white text-2xl px-1 w-12 cursor-pointer transition hover:text-slate-300" />
        </div>
      </div>
      <Chat />
      <form className="w-full relative" onSubmit={(e) => handleSendMessage(e)}>
        <input
          type="text"
          placeholder="Type something..."
          className="p-4 w-full outline-none"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <div className="absolute right-0 top-0 bottom-0 flex h-full items-center justify-center gap-3 p-4 z-10">
          <MdAttachFile className="text-2xl text-slate-600 cursor-pointer hover:text-black transition" />
          <input
            style={{display: "none"}}
            type="file"
            id="img"
            name="img"
            accept="image/png, image/jpeg"
            onChange={(e) => setImg(e.target.files[0])}
          />
          <label htmlFor="img">
            <RiImageAddFill className="text-2xl text-slate-600 cursor-pointer hover:text-black transition" />
          </label>
          <button onClick={handleSendMessage}>
            <MdSend className="text-3xl text-blue-500 cursor-pointer hover:text-blue-700 transition" />
          </button>
        </div>
      </form>
    </div>
  );
};

export default Chats;
