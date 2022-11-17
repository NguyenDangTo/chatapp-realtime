import {doc, onSnapshot} from "firebase/firestore";
import React, {useContext, useEffect, useState} from "react";
import {AuthContext} from "../Context/AuthContext";
import User from "./User";
import SearchUser from "./SearchUser";
import {db} from "../firebase";
import {ChatContext} from "../Context/ChatContext";
const UserList = ({searchUser, handleAdd}) => {
  const [userChats, setUserChats] = useState([]);
  const {currentUser} = useContext(AuthContext);

  const {dispatch} = useContext(ChatContext);

  useEffect(() => {
    const getChats = () => {
      const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
        setUserChats(doc.data());
      });

      return () => {
        unsub();
      };
    };
    currentUser.uid && getChats();
  }, [currentUser.uid]);

  const handleSelect = (userInfo) => {
    dispatch({type: "CHANGE_USER", payload: userInfo});
  };
  return (
    <div className="h-96 bg-indigo-900 scrollbar-none overflow-y-scroll flex flex-col justify-start">
      {searchUser && <SearchUser UserData={searchUser} handleAdd={handleAdd} />}
      {!searchUser &&
        Object.entries(userChats)
          ?.sort((a, b) => b[1].date - a[1].date)
          .map((user, index) => <User key={index} UserData={user} handleSelect={handleSelect} />)}
    </div>
  );
};

export default React.memo(UserList);
