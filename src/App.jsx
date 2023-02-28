
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import "./utils/firebase";
import { useState } from "react";
import { useEffect } from "react";
import Header from "./components/Header";
import LoginPage from "./pages/Login";
import AdminPage from "./pages/Admin";
const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginPage/>
  },
  {
    path:"/profile",
    element:<LoginPage/>
  },
  {
    path:"/admin",
    element:<AdminPage/>
  }
]);
function App() {

  
  return (
    <div className="bg-dark text-white min-w-screen min-h-screen">
      <RouterProvider router={router}/>
    </div>
  );
}

export default App;
