import React, { useState } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuthContext } from "../context/authContext";
import LoadingPage from "../pages/LoadingPage";

const ProtectedRoute = () => {
  const { user, loading } = useAuthContext();
  console.log(user,loading);
  let location = useLocation();
  if (loading) {
    return <LoadingPage />
  }
  if (!user) {
    return <Navigate to="/login" state={{ from: location.pathname }} />;
  }
  return <Outlet />;
};

export default ProtectedRoute;
