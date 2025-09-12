import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {
  Login,
  Register,
  ForgotPassword,
  ResetPassword,
  VerifyOtp,
  PrivateRoute,
  MainLayout,
  Dashboard,
  ChatPage,
  Wardrobe,
} from "../index";
import { Button } from "@/components/ui/button";

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<h1>Home Page</h1>} />
        <Route path="/auth">
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="forgot-password" element={<ForgotPassword />} />
          <Route path="reset-password" element={<ResetPassword />} />
          <Route path="verify-otp" element={<VerifyOtp />} />
        </Route>

        <Route
          path="/users/*"
          element={
            <PrivateRoute>
              <MainLayout />
            </PrivateRoute>
          }
        >
          <Route index path="dashboard" element={<Dashboard />} />
          <Route path="chat" element={<ChatPage />} />
          <Route path="wardrobe" element={<Wardrobe />} />
          <Route path="trips" element={<Button>Submit</Button>} />
          <Route path="packing-list" element={<h1>Packing List</h1>} />
          <Route path="outfits" element={<h1>Outfit Suggestions</h1>} />
          <Route
            path="destination-tools"
            element={<h1>Destination Tools</h1>}
          />
          <Route path="group-tools" element={<h1>Group Tools</h1>} />
          <Route path="shop" element={<h1>Shop</h1>} />
          <Route path="profile" element={<h1>Profile</h1>} />
        </Route>

        <Route path="*" element={<h1>404 - Page Not Found</h1>} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
