import React from "react";
import { AiOutlineLoading } from "react-icons/ai";

function LoadingSpiner() {
  return (
    <div className=" min-h-screen bg-gradient-to-br from-gray-900 via-green-900 to-emerald-900 flex items-center justify-center relative overflow-hidden">
      <AiOutlineLoading className=" animate-spin mx-auto text-gray-300 size-10" />
    </div>
  );
}

export default LoadingSpiner;
