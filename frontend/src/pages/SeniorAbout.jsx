import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { seniorsData } from "../data/seniorsData";
import { FaPeopleArrows } from "react-icons/fa";

const SeniorAbout = () => {
  const { seniorId } = useParams();
  const navigate = useNavigate();

  const senior = seniorsData.find((s) => s.id === parseInt(seniorId));

  if (!senior) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0f3460]">
        <p className="text-gray-300 text-xl">Senior not found.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f3460] text-white">
      <div className="max-w-6xl mx-auto p-6">
        {/* Top Section */}
        <div className="flex flex-col md:flex-row gap-8 bg-gray-900/70 rounded-3xl shadow-2xl p-8 backdrop-blur-md border border-gray-700">
          {/* Profile Image */}
          <div className="flex-shrink-0 flex justify-center md:justify-start">
            <div className="w-40 h-40 md:w-48 md:h-48 rounded-full overflow-hidden border-4 border-purple-500 shadow-lg">
              <img
                src={senior.img}
                alt={senior.name}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
          </div>

          {/* Info */}
          <div className="flex-1 flex flex-col justify-center gap-3">
            <h2 className="text-4xl font-extrabold bg-gradient-to-r from-purple-400 via-pink-500 to-red-400 bg-clip-text text-transparent">
              {senior.name}
            </h2>
            <p className="text-lg font-medium text-gray-300">
              {senior.branch} • {senior.year}
            </p>
            <p className="text-sm md:text-base leading-relaxed text-gray-400">
              {senior.description}
            </p>

            <div className="mt-5 self-start">
              {" "}
              {/* Added self-start */}
              <button
                onClick={() => navigate("/connect")}
                className="inline-flex items-center gap-2 bg-purple-700 hover:bg-purple-800 text-white font-semibold px-6 py-3 rounded-full shadow-lg hover:scale-105 transition-all duration-300"
              >
                <FaPeopleArrows className="text-xl" /> Connect With Us
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-10 bg-gray-900/70 rounded-3xl shadow-2xl p-8 backdrop-blur-md border border-gray-700">
          <h2 className="text-4xl font-extrabold text-center bg-gradient-to-r from-purple-400 via-pink-500 to-red-400 bg-clip-text text-transparent mb-8">
            Senior Profile
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              { label: "🏆 Achievements", value: senior.achievements },
              { label: "🎭 ExtraCurricular", value: senior.extraCurricular },
              { label: "🤝 Societies / Clubs", value: senior.societies },
              { label: "💡 Key Notes", value: senior.keynote },
            ].map((item, idx) => (
              <div
                key={idx}
                className="p-6 bg-gray-800 rounded-2xl hover:bg-gray-700 transition"
              >
                <h3 className="text-xl font-semibold">{item.label}</h3>
                <p className="mt-2 text-gray-300">
                  {item.value || "No information provided."}
                </p>
              </div>
            ))}

            <div className="md:col-span-2 p-6 bg-gray-800 rounded-2xl hover:bg-gray-700 transition">
              <h3 className="text-xl font-semibold">🌱 Personal Interests</h3>
              <p className="mt-2 text-gray-300">
                {senior.personalInterests || "No interests shared."}
              </p>
            </div>
          </div>
        </div>

        {/* Back Button */}
        <button
          onClick={() => navigate("/connect-seniors")}
          className="mt-6 inline-flex items-center gap-2 px-6 py-2 bg-purple-700 hover:bg-purple-800 text-white font-semibold rounded-full shadow-lg hover:scale-105 transition-all duration-300"
        >
          <span className="text-lg">←</span> Go Back
        </button>
      </div>
    </div>
  );
};

export default SeniorAbout;

// {/* <a
//               href={senior.googleForm}
//               target="_blank"
//               rel="noopener noreferrer"
//               className="mt-5 inline-flex items-center gap-2 bg-gradient-to-r from-indigo-500 to-purple-500
//             text-white font-semibold px-6 py-3 rounded-full shadow-lg
//             hover:scale-105 transition-all duration-300 w-auto max-w-max"
//             >
//               <FaPeopleArrows className="text-xl" /> Connect With Us
//             </a> */}
