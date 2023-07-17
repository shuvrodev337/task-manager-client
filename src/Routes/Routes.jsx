import {
    createBrowserRouter,
  } from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import Home from "../pages/Home/Home";
import Signup from "../pages/Signup/Signup";
import Login from "../pages/Login/Login";
import CreateTask from "../pages/CreateTask/CreateTask";
import MyTasks from "../pages/MyTasks/MyTasks";

  const router = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout></MainLayout>,
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
            element:<CreateTask></CreateTask>
        },
        {
            path:'/my-tasks',
            element:<MyTasks></MyTasks>
        }
      ]
    },
  ]);

  export default router