import {toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Toastify = (type, message) => {
  toast[type](message, {pauseOnHover: false, autoClose: 2000, pauseOnFocusLoss: false});
};

export default Toastify;
