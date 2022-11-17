import React from "react";
import {Link} from "react-router-dom";
import {FaUserAlt} from "react-icons/fa";
import {useNavigate} from "react-router-dom";
// @ts-ignore
import Toastify from "../components/Toastify";
// Register Firebase and save data in Firebase Cloud
import {createUserWithEmailAndPassword, updateProfile} from "firebase/auth";
import {auth, storage, db} from "../firebase";
import {ref, uploadBytesResumable, getDownloadURL} from "firebase/storage";
import {doc, setDoc} from "firebase/firestore";

const Register = () => {
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();

    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const repassword = e.target[3].value;
    const file = e.target[4].files[0];

    if (password !== repassword) {
      return Toastify("warn", "Nhập lại mật khẩu sai");
    }
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);

      const storageRef = ref(storage, "images/" + file.name);

      await uploadBytesResumable(storageRef, file).then(() => {
        getDownloadURL(storageRef).then(async (downloadURL) => {
          await updateProfile(res.user, {
            displayName,
            photoURL: downloadURL,
          });
          await setDoc(doc(db, "users", res.user.uid), {
            uid: res.user.uid,
            displayName,
            email,
            photoURL: downloadURL,
          });
          // Create a new user empty chats
          await setDoc(doc(db, "userChats", res.user.uid), {});
        });
      });
      Toastify("success", "Đăng ký thành công");
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex items-center justify-center w-screen min-h-screen bg-indigo-400 px-4 shadow-lg">
      <div className="p-4 bg-white rounded-lg w-full md:w-1/2 lg:w-1/3">
        <h1 className="font-bold text-3xl text-center">
          Xelvis<span className="text-red-500">64</span> Chat
        </h1>
        <h2 className="font-bold text-3xl text-center my-3">REGISTER</h2>
        <form className="w-full flex flex-col p-2 my-4" onSubmit={(e) => handleSubmit(e)}>
          <input
            className="px-3 py-1 my-1 focus:outline-none focus:ring-2 focus:ring-indigo-400 rounded border-indigo-400 border-solid border-2 transition"
            type="text"
            placeholder="Display name"
            autoComplete="on"
            required={true}
          />
          <input
            className="px-3 py-1 my-1 focus:outline-none focus:ring-2 focus:ring-indigo-400 rounded border-indigo-400 border-solid border-2 transition"
            type="email"
            placeholder="Email"
            autoComplete="on"
            required={true}
          />
          <input
            className="px-3 py-1 my-1 focus:outline-none focus:ring-2 focus:ring-indigo-400 rounded border-indigo-400 border-solid border-2 transition"
            type="password"
            placeholder="Password"
            autoComplete="on"
            required={true}
          />
          <input
            className="px-3 py-1 my-1 focus:outline-none focus:ring-2 focus:ring-indigo-400 rounded border-indigo-400 border-solid border-2 transition"
            type="password"
            placeholder="Re-Password"
            autoComplete="on"
            required={true}
          />
          <input required style={{display: "none"}} type="file" id="img" />
          <label
            htmlFor="img"
            className="w-full flex p-2 justify-center items-center cursor-pointer hover:text-red-500 transition"
          >
            <FaUserAlt className="text-2xl" />
            <span className="p-2 font-bold">Add an avatar</span>
          </label>
          <button
            className="font-bold mt-4 bg-indigo-400 text-white p-2 hover:bg-indigo-500 transition"
            type="submit"
          >
            Register
          </button>
        </form>
        <div className="p-2 text-center">
          Already have an account?
          <Link to="../login">
            <span className="font-bold underline mx-2 transition hover:text-red-500">Login</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
