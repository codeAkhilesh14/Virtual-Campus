import React from "react";
import { FaStar } from "react-icons/fa6";
import { FaRegStar } from "react-icons/fa";

const ReviewCard = ({ comment, rating, photoUrl, name, description, courseTitle }) => {
  const firstLetter = name ? name.charAt(0).toUpperCase() : "U";
  return (
    <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 max-w-sm w-full">
      {/* ⭐ Rating Stars */}
      <div className="flex items-center mb-3 text-yellow-400 text-sm">
        {
            Array(5).fill(0).map((_,i) => (
                <span key={i}>
                {i < rating ? <FaStar/> : <FaRegStar/>}
                </span>
            ))
        }
      </div>

      {/* 💬 Review Text */}
      <p className="text-gray-700 text-sm">Review For : <span className="font-semibold">{courseTitle}</span></p>
      <p className="text-gray-700 text-sm mb-5">Review : <span className="font-semibold">{comment}</span></p>

      {/* 👤 Reviewer Info */}
      <div className="flex items-center gap-2">
        {photoUrl ? (
              <img
                src={photoUrl}
                className="w-10 h-10 rounded-full object-cover"
                alt={name}
              />
            ) : (
              <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-700 font-semibold text-sm">
                {firstLetter}
              </div>
        )}
        <div>
            <h4 className="font-semibold text-gray-800 text-sm">{name}</h4>
            <p className="text-xs text-gray-500">{description}</p>
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
