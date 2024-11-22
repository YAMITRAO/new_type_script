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
import Users from "./pages/users/all_users/Users";
import Test from "./components/Test";
import ViewUser from "./pages/users/view_user/ViewUser";
import RegisterProject from "./pages/projects/project_reg/RegisterProject";

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
          element: state.isAuth ? <Home /> : <SignUp />,
        },
        {
          path: "/login",
          element: state.isAuth ? <Home /> : <Login />,
        },
        {
          path: "/users",
          element: state.isAuth ? <Users /> : <Login />,
        },
        {
          path: "/user/view/:userId",
          element: state.isAuth ? <ViewUser /> : <Login />,
        },
        {
          path: "register-project",
          element: state.isAuth ? <RegisterProject /> : <Login />,
        },
      ],
    },
    {
      path: "/test",
      element: <Test />,
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
