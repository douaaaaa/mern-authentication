import { Route, Routes } from "react-router-dom";
import FloatingShapes from "./components/FloatingShapes";
import SignUpPage from "./Pages/SignUpPage";
import LoginPage from "./Pages/LoginPage";
import VerifyEmail from "./Pages/VerifyEmail";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <div className=" min-h-screen bg-gradient-to-br from-gray-900 via-green-900 to-emerald-900 flex items-center justify-center relative overflow-hidden">
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
        <Route path="/" element="Home" />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/verify-email" element={<VerifyEmail />} />
      </Routes>
      <Toaster />
    </div>
  );
}

export default App;
