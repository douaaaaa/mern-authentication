import { Navigate, Route, Routes } from "react-router-dom";
import FloatingShapes from "./components/FloatingShapes";
import SignUpPage from "./Pages/SignUpPage";
import LoginPage from "./Pages/LoginPage";
import VerifyEmail from "./Pages/VerifyEmail";
import { Toaster } from "react-hot-toast";
import { useAuthStore } from "./store/authStore";
import { useEffect } from "react";
import DashboardPage from "./Pages/DashboardPage";
import LoadingSpiner from "./components/LoadingSpiner";
import ForgetPassword from "./Pages/ForgetPassword";
import ResetPassword from "./Pages/ResetPassword";

const ProtectedRoute = ({ children }) => {
  const { user, isAuthenticated } = useAuthStore();
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  if (!user.isVerified) {
    return <Navigate to="/verify-email" replace />;
  }
  return children;
};

const RedirectedAuthenticatedUser = ({ children }) => {
  const { user, isAuthenticated } = useAuthStore();
  if (isAuthenticated && user.isVerified) {
    return <Navigate to="/" replace />;
  }
  return children;
};

function App() {
  const { isCheckingAuth, checkAuth, isAuthenticated, user } = useAuthStore();
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);
  if (isCheckingAuth) {
    return <LoadingSpiner />;
  }
  return (
    <div className=" overscroll-none min-h-screen bg-gradient-to-br from-gray-900 via-green-900 to-emerald-900 flex items-center justify-center relative overflow-hidden">
      <FloatingShapes
        color="bg-green-500"
        size="h-64 w-64"
        top="-5%"
        left="10%"
        delay={0}
      />
      <FloatingShapes
        color="bg-emerald-500"
        size=" h-48 w-48"
        top="70%"
        left="80%"
        delay={5}
      />
      <FloatingShapes
        color="bg-lime-500"
        size=" h-32 w-32"
        top="40%"
        left="-10%"
        delay={2}
      />
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/signup"
          element={
            <RedirectedAuthenticatedUser>
              <SignUpPage />
            </RedirectedAuthenticatedUser>
          }
        />
        <Route
          path="/login"
          element={
            <RedirectedAuthenticatedUser>
              <LoginPage />
            </RedirectedAuthenticatedUser>
          }
        />
        <Route path="/verify-email" element={<VerifyEmail />} />
        <Route
          path="/forgot-password"
          element={
            <RedirectedAuthenticatedUser>
              <ForgetPassword />
            </RedirectedAuthenticatedUser>
          }
        />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
      </Routes>
      <Toaster />
    </div>
  );
}

export default App;
