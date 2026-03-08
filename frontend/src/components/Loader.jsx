import React from "react";
import { ClipLoader, FadeLoader, HashLoader } from "react-spinners";

const Loader = ({ size = 150, color = "#4F46E5", fullScreen = true }) => {
  return (
    <div
      className={`flex justify-center items-center ${
        fullScreen ? "h-screen" : "h-full"
      }`}
    >
      <FadeLoader size={size} color={color} />
    </div>
  );
};

export default Loader;
