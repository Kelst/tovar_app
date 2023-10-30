import React from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";

import Layout from "../pages/Layout/Layout";
import Home from "../pages/Home/Home";
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
     
    ],
  },
  // {
  //   path: "/login",
  //   element: <Login />,
  // },

  
]);