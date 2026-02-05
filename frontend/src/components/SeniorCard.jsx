import React from "react";
import { FaLinkedin, FaUser } from "react-icons/fa";

const SeniorCard = ({ senior }) => {
  return (
    <div
      className="relative bg-white/70 backdrop-blur-lg shadow-xl rounded-3xl p-4 sm:p-6 flex flex-col items-center gap-4 w-full max-w-sm
                 transform transition-all duration-500 hover:-translate-y-3 hover:shadow-[0_0_25px_rgba(100,100,255,0.3)] border border-gray-200/50"
    >
      {/* Decorative Gradient Ring */}
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-blue-400 via-purple-400 to-pink-400 opacity-30 blur-[100px] -z-10"></div>

      {/* Profile Image */}
      <div className="relative">
        <img
          src={senior.img}
          alt={senior.name}
          className="w-28 h-28 sm:w-32 sm:h-32 rounded-full object-cover border-4 border-white shadow-md transition-transform duration-300 hover:scale-105"
        />
        <span
          className="absolute bottom-2 right-2 w-4 h-4 bg-green-500 border-2 border-white rounded-full"
          title="Online"
        ></span>
      </div>

      {/* Name */}
      <h3 className="font-extrabold font-serif text-xl sm:text-2xl text-gray-900 text-center tracking-tight">
        {senior.name}
      </h3>

      {/* Branch & Year */}
      <p className="text-sm sm:text-base text-gray-800 font-medium">
        {senior.branch} • {senior.year}
      </p>

      {/* Description */}
      <p className="text-sm sm:text-base text-gray-700 text-center leading-relaxed px-2">
        {senior.description}
      </p>

      {/* Divider */}
      <hr className="w-2/3 border-t border-gray-300/50 my-2" />

      {/* Action Buttons */}
      <div className="flex flex-col gap-3 mt-3 items-center w-full">
        <div className="flex gap-3 justify-center w-full">
          <a
            href={senior.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 bg-blue-700 text-white px-6 py-2 rounded-full 
           hover:bg-blue-800 hover:scale-105 shadow-md transition-all duration-300 text-sm flex-1 max-w-[140px]"
          >
            <FaLinkedin /> LinkedIn
          </a>

          <a
            href={`/senior-about/${senior.id}`}
            className="flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 
         text-white px-8 py-2 rounded-full hover:scale-105 hover:shadow-lg transition-all duration-300 text-sm max-w-[180px] w-auto"
          >
            <FaUser /> About
          </a>
        </div>
      </div>
    </div>
  );
};

export default SeniorCard;
