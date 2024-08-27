import React, { useState } from "react";
import { motion } from "framer-motion";
import Input from "../components/Input";
import { MdOutlineEmail } from "react-icons/md";
import { Link } from "react-router-dom";
import { AiOutlineLoading } from "react-icons/ai";
import { useAuthStore } from "../store/authStore";
import toast from "react-hot-toast";

function ForgetPassword() {
  const [Email, setEmail] = useState("");
  const [IsSubmitted, setIsSubmitted] = useState(false);
  const { isLoading, error, forgetPassword } = useAuthStore();
  const handelSubmit = async (e) => {
    e.preventDefault();
    try {
      await forgetPassword(Email);
      setIsSubmitted(true);
      toast.success("Reset Link sent successfully");
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
          Forget Password
        </h1>
        {IsSubmitted ? (
          <div className=" flex items-center justify-center flex-col">
            <div className="p-5 bg-green-500 rounded-full mb-4">
              <MdOutlineEmail className=" size-16 text-white " />
            </div>
            <p className=" text-gray-300 text-center">
              {`If an account exists for ${Email}, you will recieve a password  reset link shrotly.`}
            </p>
          </div>
        ) : (
          <form onSubmit={handelSubmit}>
            <p className=" text-center text-gray-300 mb-4">
              Enter your email address and we'll send you a link to reset
              password
            </p>
            <Input
              icon={MdOutlineEmail}
              type="email"
              placeholder="Email Address"
              value={Email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {error && (
              <p className=" text-red-500 font-semibold mb-2 capitalize">
                {error}
              </p>
            )}
            <motion.button
              className=" w-full py-3 px-4 bg-gradient-to-r from-green-500 to-emerald-600  text-white font-bold rounded-lg shadow-lg hover:from-green-600 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition duration-200"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
            >
              {isLoading ? (
                <AiOutlineLoading className=" animate-spin mx-auto size-4" />
              ) : (
                "Send Reset Link"
              )}
            </motion.button>
          </form>
        )}
      </div>
      <div className=" px-8 py-4 bg-gray-900 bg-opacity-50 flex justify-center">
        <Link
          to={"/login"}
          className=" text-sm  text-green-400 hover:underline"
        >
          Back to login
        </Link>
      </div>
    </motion.div>
  );
}

export default ForgetPassword;
