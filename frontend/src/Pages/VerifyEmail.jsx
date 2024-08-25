import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { AiOutlineLoading } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

function VerifyEmail() {
  const isLoading = false;
  const [Code, setCode] = useState(["", "", "", "", "", ""]);
  const inputRefs = useRef([]);
  const navigate = useNavigate();

  const handleChange = (index, eValue) => {
    const newCode = [...Code];

    if (eValue.length > 1) {
      const pastedCode = eValue.slice(0, 6).split("");
      for (let index = 0; index < pastedCode.length; index++) {
        newCode[index] = pastedCode[index] || "";
      }
      const lastFilledInedx = newCode.findLastIndex((digit) => digit !== "");
      const focusIndex = lastFilledInedx < 5 ? lastFilledInedx + 1 : 5;
      inputRefs.current[focusIndex].focus();
      setCode(newCode);
    } else {
      newCode[index] = eValue;
      setCode(newCode);
      if (eValue && index < 5) {
        inputRefs.current[index + 1].focus();
      }
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !Code[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(`you've submited ${Code.join("")}`);
  };

  useEffect(() => {
    if (Code.every((digit) => digit !== "")) {
      handleSubmit(new Event("submit"));
    }
  }, [Code]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className=" w-[500px] bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-2xl rounded-2xl shadow-xl overflow-hidden"
    >
      <div className=" p-8">
        <h1 className=" text-3xl font-bold text-center text-green-400 mb-6">
          Verify Your Email
        </h1>
        <p className=" text-gray-300 text-center">
          Enter the 6 digits code sent to your email address.
        </p>
        <form onSubmit={handleSubmit} className=" my-6">
          <div className=" flex justify-between">
            {Code.map((digit, index) => (
              <input
                key={index}
                ref={(e) => (inputRefs.current[index] = e)}
                type="text"
                maxLength="6"
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                className=" size-12 text-center text-2xl font-bold bg-gray-700 text-white border-2 border-gray-500 rounded-lg focus:border-green-500 focus:border-3 focus:outline-none"
              />
            ))}
          </div>
          <motion.button
            className=" mt-5 w-full py-3 px-4 bg-gradient-to-r from-green-500 to-emerald-600  text-white font-bold rounded-lg shadow-lg hover:from-green-600 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition duration-200"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
          >
            {isLoading ? (
              <AiOutlineLoading className=" animate-spin mx-auto size-4" />
            ) : (
              "Verify"
            )}
          </motion.button>
        </form>
      </div>
    </motion.div>
  );
}

export default VerifyEmail;
