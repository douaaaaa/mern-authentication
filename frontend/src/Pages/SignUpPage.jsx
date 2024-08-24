import React, { useState } from "react";
import { motion } from "framer-motion";
import Input from "../components/Input";
import { FaRegUser } from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import { Link } from "react-router-dom";
import PasswordMeter from "../components/PasswordMeter";

function SignUpPage() {
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  const [Name, setName] = useState("");
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className=" w-[600px] bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden"
    >
      <div className=" p-8">
        <h1 className=" text-3xl font-bold mb-6 text-center text-green-400 ">
          Create An Account
        </h1>
        <form onSubmit={handleSubmit}>
          <Input
            icon={FaRegUser}
            type="text"
            placeholder="Full Name"
            value={Name}
            onChange={(e) => setName(e.target.value)}
          />
          <Input
            icon={MdOutlineEmail}
            type="email"
            placeholder="Email Address"
            value={Email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            icon={RiLockPasswordLine}
            type="password"
            placeholder="Password"
            value={Password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </form>
        <PasswordMeter password={Password} />
        <motion.button
          className=" mt-5 w-full py-3 px-4 bg-gradient-to-r from-green-500 to-emerald-600  text-white font-bold rounded-lg shadow-lg hover:from-green-600 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition duration-200"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
        >
          Sign Up
        </motion.button>
      </div>
      <div className=" px-8 py-4 bg-gray-900 bg-opacity-50 flex justify-center">
        <p className=" text-sm text-gray-400">
          Already have an account? {""}
          <Link to={"/login"} className=" text-green-400 hover:underline">
            Log In
          </Link>
        </p>
      </div>
    </motion.div>
  );
}

export default SignUpPage;
