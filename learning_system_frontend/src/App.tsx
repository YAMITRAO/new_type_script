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
import Projects from "./pages/projects/all_projects/Projects";
import ProjectView from "./pages/projects/project_view/ProjectView";
import Invitationcard from "./pages/projects/project_view/ProjectInvitationCard";
import Invitations from "./pages/invitations/Invitations";
import InventoryReg from "./pages/inventory/add_to_inventory/InventoryReg";
import Inventory from "./pages/inventory/inventory_view/Inventory";
import InventoryViewCard from "./pages/inventory/inventory_view/InventoryViewCard";

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
        {
          path: "/projects",
          element: state.isAuth ? <Projects /> : <Login />,
        },
        {
          path: "/project/view/:projectId",
          element: state.isAuth ? <ProjectView /> : <Login />,
        },
        {
          path: "invitations",
          element: state.isAuth ? <Invitations /> : <Login />,
        },
        {
          path: "/inventory",
          element: state.isAuth ? <Inventory /> : <Login />,
        },
        {
          path: "/add-to-inventory",
          element: state.isAuth ? <InventoryReg /> : <Login />,
        },
      ],
    },
    {
      path: "/test",
      // element: <Test />,
      // element: <InventoryViewCard />,
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
