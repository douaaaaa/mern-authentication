import React, { useState } from "react";
import { motion } from "framer-motion";
import Input from "../components/Input";
import { RiLockPasswordLine } from "react-icons/ri";
import { AiOutlineLoading } from "react-icons/ai";
import { useNavigate, useParams } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import toast from "react-hot-toast";

function ResetPassword() {
  const [Password, setPassword] = useState("");
  const [ConfirmPass, setConfirmPass] = useState("");
  const { token } = useParams();
  const { isLoading, resetPassword } = useAuthStore();
  const navigate = useNavigate();
  const submitHandler = async (e, token) => {
    e.preventDefault();
    if (Password !== ConfirmPass) {
      throw new Error(" Different Passwords");
    }
    try {
      await resetPassword(Password, token);
      navigate("/login");
      toast.success(" The password is successfully changed");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className=" w-[600px] bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden"
    >
      <div className=" p-8">
        <h1 className=" text-3xl font-bold mb-6 text-center text-green-400 ">
          Reset Password
        </h1>
        <form onSubmit={(e) => submitHandler(e, token)}>
          <Input
            icon={RiLockPasswordLine}
            type="password"
            placeholder="New Password"
            value={Password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Input
            icon={RiLockPasswordLine}
            type="password"
            placeholder="Confirm New Password"
            value={ConfirmPass}
            onChange={(e) => setConfirmPass(e.target.value)}
          />
          <motion.button
            className=" mt-2 w-full py-3 px-4 bg-gradient-to-r from-green-500 to-emerald-600  text-white font-bold rounded-lg shadow-lg hover:from-green-600 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition duration-200"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
          >
            {isLoading ? (
              <AiOutlineLoading className=" animate-spin mx-auto size-4" />
            ) : (
              "Set New Password"
            )}
          </motion.button>
        </form>
      </div>
    </motion.div>
  );
}

export default ResetPassword;
