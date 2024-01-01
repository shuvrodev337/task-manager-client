import {
    createBrowserRouter,
  } from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import Home from "../pages/Home/Home";
import Signup from "../pages/Signup/Signup";
import Login from "../pages/Login/Login";
import CreateTask from "../pages/CreateTask/CreateTask";
import MyTasks from "../pages/MyTasks/MyTasks";
import EditTask from "../components/EditTask/EditTask";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import PrivateRoute from "./PrivateRoute";

  const router = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout></MainLayout>,
    errorElement:<ErrorPage></ErrorPage>,

      children:[
        {
            path:'/',
            element:<Home></Home>
        },
        {
            path:'/sign-up',
            element:<Signup></Signup>
        },
        {
            path:'/log-in',
            element:<Login></Login>
        },
        {
            path:'/create-task',
            element:<PrivateRoute><CreateTask></CreateTask></PrivateRoute>
        },
        // {
        //     path:'/my-tasks',
        //     element:<MyTasks></MyTasks>
        // },
        {
            path:'/edit-task',
            element:<PrivateRoute><EditTask></EditTask></PrivateRoute>
        },
        
      ]
    },
  
  ]);

  export default router