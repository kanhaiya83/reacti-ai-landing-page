import {
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements,
  Route,
} from "react-router-dom";

import "./utils/firebase";
import LoginPage from "./pages/Login";
import AdminPage from "./pages/Admin";
import "./App.css";
import HomePage from "./pages/Home";
import PrivacyPolicyPage from "./pages/PrivacyPolicy";
import PricingPage from "./pages/PricingPage";
import ProtectedRoute from "./components/ProtectedRoute";
import ProfilePage from "./pages/Profile";

// Create a client
const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/" element={<ProtectedRoute />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
        <Route path="/pricing" element={<PricingPage />} />
        <Route path="/admin" element={<AdminPage />} />
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
