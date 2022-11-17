import {useContext} from "react";
import "./App.css";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
import {ToastContainer} from "react-toastify";
import {AuthContext} from "./Context/AuthContext";

function App() {
  const {currentUser} = useContext(AuthContext);
  const ProtectedRoute = ({children}) => {
    if (!currentUser) {
      return <Navigate to="/login" />;
    }
    return children;
  };
  const ErrorRoute = () => {
    return <Navigate to="/login" />;
  };
  return (
    <BrowserRouter>
      <ToastContainer />
      <Routes>
        <Route path="/">
          <Route
            index
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>
        <Route path="/*" element={<ErrorRoute />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
