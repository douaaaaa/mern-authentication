import React from "react";
import { FaCheck } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";

const passwordCriteria = (password) => {
  const criteria = [
    { lable: "At least 6 characters", met: password.length >= 6 },
    { lable: "Contains uppercase letters", met: /[A-Z]/.test(password) },
    { lable: "Contains lowercase letters", met: /[a-z]/.test(password) },
    { lable: "Contains a number", met: /\d/.test(password) },
    {
      lable: "Contains a special character",
      met: /[^A-Za-z0-9]/.test(password),
    },
  ];
  return (
    <div>
      {criteria.map((e) => (
        <div key={e.lable} className=" flex items-center text-sm">
          {e.met ? (
            <FaCheck className=" text-green-500 mr-2 size-4" />
          ) : (
            <RxCross2 className=" text-gray-500 mr-2 size-4" />
          )}
          <span className={e.met ? "text-green-500" : "text-gray-500"}>
            {e.lable}
          </span>
        </div>
      ))}
    </div>
  );
};

function PasswordMeter({ password }) {
  const getStrength = (pass) => {
    let strength = 0;
    if (pass.length >= 6) strength++;
    if (pass.match(/[A-Z]/) && pass.match(/[a-z]/)) strength++;
    if (pass.match(/\d/)) strength++;
    if (pass.match(/[^A-Za-z0-9]/)) strength++;
    return strength;
  };
  const strength = getStrength(password);
  const getStrengthText = (strength) => {
    if (strength === 0) return "Vert weak";
    if (strength === 1) return "Weak";
    if (strength === 2) return "Fair";
    if (strength === 3) return "Good";
    return "Strong";
  };
  const getColor = (strength) => {
    if (strength === 1) return "bg-red-500";
    if (strength === 2 || strength === 3) return "bg-yellow-500";
    if (strength === 4) return "bg-green-500";
  };
  return (
    <div className=" mt-2">
      <div className=" flex items-center justify-between mb-1">
        <span className=" text-xs text-gray-400">Password strength</span>
        <span className=" text-xs text-gray-400">
          {getStrengthText(strength)}
        </span>
      </div>
      <div className=" flex space-x-1 my-2">
        {[...Array(4)].map((_, index) => (
          <div
            key={index}
            className={`h-1 w-1/4 rounded-full transition-colors duration-200 ${
              index < strength ? getColor(strength) : "bg-gray-600"
            }`}
          ></div>
        ))}
      </div>
      {passwordCriteria(password)}
    </div>
  );
}

export default PasswordMeter;
