import React from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";

import Layout from "../pages/Layout/Layout";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Orders from "../pages/Orders/Orders";
import Order from "../components/Order";
export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    
    children: [
      {
        index:true,
        element: <Home/>, 
      
      },
      {
        path: "/home",
        element: <Home />,
      },
      {
        path: "/orders",
        element: <Orders />,
      },
      {
        path:"/order/:id",
        element:<Order/>
      }
     
    ],
  },{
    path:"/login",
    element:<Login/>
  }
  // {
  //   path: "/login",
  //   element: <Login />,
  // },

  
]);