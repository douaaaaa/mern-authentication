import React from "react";
import { motion } from "framer-motion";
import { useAuthStore } from "../store/authStore";
import { formatDate } from "../utils/date";
import { AiOutlineLoading } from "react-icons/ai";

function DashboardPage() {
  const { user, isLoading, logout } = useAuthStore();
  const handelLogout = async (e) => {
    e.preventDefault();
    logout();
  };
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ delay: 0.5 }}
      className=" max-w-md w-full mx-auto mt-10 p-8 bg-gray-900 bg-opacity-80 backdrop-filter backdrop-blur-lg rounded-xl shadow-xl border border-gray-800"
    >
      <h2 className=" text-3xl font-bold mb-6 text-green-500 text-center">
        Dashboard
      </h2>
      <div className=" space-y-6">
        <motion.div
          className=" p-4 bg-gray-800 bg-opacity-50 rounded-lg border border-gray-700"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <h3 className=" text-xl font-semibold mb-3 text-green-400">
            Profile information
          </h3>
          <p className=" text-gray-300 capitalize">Name: {user.name}</p>
          <p className=" text-gray-300">Email: {user.email}</p>
        </motion.div>
        <motion.div
          className=" p-4 bg-gray-800 bg-opacity-50 rounded-lg border border-gray-700"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
        >
          <h3 className=" text-center text-green-400 font-semibold mb-3 text-xl">
            Account activity
          </h3>
          <p className=" text-gray-300">
            <span className=" font-bold">Joined: </span>
            {new Date(user.createdAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>{" "}
          <p className=" text-gray-300">
            <span className=" font-bold">Last login: </span>
            {user.lastLogin
              ? formatDate(user.lastLogin)
              : "You've just sign up"}
          </p>
        </motion.div>
      </div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2 }}
        className=" mt-6"
      >
        <motion.button
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.95 }}
          className=" bg-green-500 w-full py-3 px-4 text-white rounded-lg shadow-lg font-bold hover:bg-green-600 transition duration-200"
          onClick={handelLogout}
          disabled={isLoading}
        >
          {isLoading ? (
            <AiOutlineLoading className=" animate-spin mx-auto size-4" />
          ) : (
            "Log out"
          )}
        </motion.button>
      </motion.div>
    </motion.div>
  );
}

export default DashboardPage;
