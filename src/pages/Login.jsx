import React from "react";
import {Link, useNavigate} from "react-router-dom";
// @ts-ignore
import "react-toastify/dist/ReactToastify.css";
// @ts-ignore
import Toastify from "../components/Toastify";
import {signInWithEmailAndPassword} from "firebase/auth";
import {auth} from "../firebase";
const Login = () => {
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();

    const email = e.target[0].value;
    const password = e.target[1].value;

    try {
      await signInWithEmailAndPassword(auth, email, password);
      Toastify("success", "Đăng nhập thành công");
      navigate("/");
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
        <h2 className="font-bold text-3xl text-center my-3">LOGIN</h2>
        <form className="w-full flex flex-col p-2 my-4" onSubmit={(e) => handleSubmit(e)}>
          <input
            className="px-3 py-1 my-1 focus:outline-none focus:ring-2 focus:ring-indigo-400 rounded border-violet border-solid border-2 transition"
            type="email"
            placeholder="Email"
            autoComplete="on"
            required={true}
          />
          <input
            className="px-3 py-1 my-1 focus:outline-none focus:ring-2 focus:ring-indigo-400 rounded border-violet border-solid border-2 transition"
            type="password"
            placeholder="Password"
            autoComplete="on"
            required={true}
          />
          <button
            className="font-bold mt-4 bg-indigo-400 text-white p-2 hover:bg-indigo-500 transition"
            type="submit"
          >
            Login
          </button>
        </form>
        <div className="p-2 text-center">
          You don't have an account?
          <Link to="../register">
            <span className="font-bold underline mx-2 transition hover:text-red-500">Register</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
