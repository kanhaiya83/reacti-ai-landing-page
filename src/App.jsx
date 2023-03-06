
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
import "./App.css"
import HomePage from "./pages/Home";
import PrivacyPolicyPage from "./pages/PrivacyPolicy";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage/>
  },
  {
    path:"/profile",
    element:<LoginPage/>
  }, {
    path:"/login",
    element:<LoginPage/>
  }, {
    path:"/privacy-policy",
    element:<PrivacyPolicyPage/>
  },
  {
    path:"/admin",
    element:<AdminPage/>
  }
]);
function App() {

  
  return (
    <div className="bg-[#191827] text-white min-w-screen min-h-screen">
      <RouterProvider router={router}/>
    </div>
  );
}

export default App;
