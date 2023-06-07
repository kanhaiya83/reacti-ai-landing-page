import {
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements,
  Route,
} from "react-router-dom";

import "./utils/firebase";
import LoginPage from "./pages/Login";
import "./App.css";
import HomePage from "./pages/Home";
import PrivacyPolicyPage from "./pages/PrivacyPolicy";
import PricingPage from "./pages/PricingPage";
import ProtectedRoute from "./components/ProtectedRoute";
import ProfilePage from "./pages/Profile";
import AdminLayout from "./Layout/AdminLayout";
import AdminLogin from "./components/AdminPage/AdminLogin";
import UsersPanel from "./components/AdminPage/UsersPanel";
import PromptPanel from "./components/AdminPage/PromptPanel";
import CouponsPanel from "./components/AdminPage/CouponsPanel";

// Create a client
const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
      <Route path="/" element={<ProtectedRoute />}>
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/pricing" element={<PricingPage />} />
      
      </Route>
      <Route path="/admin" element={<AdminLayout />}>
          <Route path="login" element={<AdminLogin/>}/>
          <Route path="coupons" element={<CouponsPanel/>}/>
          <Route path="" element={<UsersPanel/>}/>
          <Route path="prompt" element={<PromptPanel/>}/>
        </Route>
    </>
  ));
function App() {
  return (
      <div className="bg-[#191827] text-white min-w-screen min-h-screen">
        <RouterProvider router={router} />
      </div>
  );
}

export default App;
