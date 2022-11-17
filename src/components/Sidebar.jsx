import React, {useState, useContext} from "react";
import {useNavigate} from "react-router-dom";
import UserList from "./UserList";
import {signOut} from "firebase/auth";
import {auth} from "../firebase";
import Toastify from "./Toastify";
import {AuthContext} from "../Context/AuthContext";
import {db} from "../firebase";
import {
  collection,
  getDocs,
  getDoc,
  query,
  where,
  doc,
  setDoc,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";
const Sidebar = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [user, setUser] = useState(null);
  const {currentUser} = useContext(AuthContext);
  const userSignOut = () => {
    signOut(auth);
    Toastify("success", "Đăng xuất thành công");
    navigate("/login");
  };

  const handleKey = (e) => {
    e.code === "Enter" && handleSearch();
  };
  // search user in sidebar
  const handleSearch = async () => {
    const q = query(collection(db, "users"), where("displayName", "==", username));
    try {
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty)
        querySnapshot.forEach((doc) => {
          setUser(doc.data());
        });
      else {
        setUser(null);
      }
    } catch (error) {
      console.log(error);
    }
  };
  // select user to chat
  const handleAdd = async (user) => {
    // check group chat exists in database => if not create
    const combinedId =
      currentUser.uid > user.uid ? currentUser.uid + user.uid : user.uid + currentUser.uid;
    try {
      const res = await getDoc(doc(db, "chats", combinedId));

      if (!res.exists()) {
        await setDoc(doc(db, "chats", combinedId), {messages: []});
        // create chats between 2 users
        await updateDoc(doc(db, "userChats", currentUser.uid), {
          [combinedId + ".userInfo"]: {
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });

        await updateDoc(doc(db, "userChats", user.uid), {
          [combinedId + ".userInfo"]: {
            uid: currentUser.uid,
            displayName: currentUser.displayName,
            photoURL: currentUser.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });
      }
    } catch (error) {
      console.log(error);
    }
    setUser(null);
    setUsername("");
  };
  return (
    <div className="h-full w-1/3 bg-indigo-800 flex flex-col">
      <div className="flex justify-between items-center p-3 h-16">
        <h1 className="font-bold text-xl text-white">
          Xelvis<span className="text-red-500">64</span>
        </h1>
        <div className="flex items-center justify-end w-1/2">
          <div className="w-10 h-10 rounded-full overflow-hidden">
            <img src={`${currentUser?.photoURL}`} alt="avatar" width="100%" height="100%" />
          </div>
          <div className="flex flex-col justify-center p-2">
            <p className="text-white font-bold">{currentUser?.displayName}</p>
            <p
              className="text-white text-sm cursor-pointer transition hover:text-red-500"
              onClick={userSignOut}
            >
              Log out
            </p>
          </div>
        </div>
      </div>
      <div className="w-full bg-indigo-900 border-solid border-slate-500 border-b-2">
        <input
          className="w-full p-4 outline-none bg-indigo-900 text-white"
          type="text"
          placeholder="Find a user"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          onKeyDown={(e) => handleKey(e)}
        />
      </div>
      <UserList searchUser={user} handleAdd={handleAdd} />
    </div>
  );
};

export default Sidebar;
