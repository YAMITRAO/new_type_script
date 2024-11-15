import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Layout from "./components/Layout";
import SignUp from "./pages/auth/SignUp";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from "./pages/auth/Login";
import Home from "./pages/home/Home";
import { useContext } from "react";
import UserContext from "./context/user_context/UserContext";

function App() {
  const { state } = useContext(UserContext);
  console.log("context values are :-", state);

  let router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: state.isAuth ? <Home /> : <Login />,
        },
        {
          path: "/signup",
          element: <SignUp />,
        },
        {
          path: "/login",
          element: <Login />,
        },
      ],
    },
  ]);
  return (
    <>
      <ToastContainer />
      <RouterProvider router={router}></RouterProvider>
    </>
  );
}

export default App;
