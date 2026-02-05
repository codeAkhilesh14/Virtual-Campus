import React, { useState } from "react";
import SeniorCard from "../components/SeniorCard";
import { seniorsData } from "../data/seniorsData";
import Nav from "../components/Nav";
import { BsFillPeopleFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

const ConnectSeniors = () => {
  const navigate = useNavigate(); // ✅ initialize

  const branches = [
    "CSE",
    "CSE-AIML",
    "IT",
    "CSDS",
    "ECE",
    "EE",
    "EEE",
    "ME",
    "CIVIL",
  ];
  const [selectedBranch, setSelectedBranch] = useState("");

  const filteredSeniors = selectedBranch
    ? seniorsData.filter((s) => s.branch === selectedBranch)
    : seniorsData;

  return (
    <div className="min-h-screen bg-gray-900">
      <Nav />
      <div className="p-6 max-w-7xl mx-auto">
        <div className="text-center mb-10 mt-15">
          <h2
            className="text-4xl sm:text-5xl font-extrabold bg-clip-text text-transparent 
                         bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 mb-4"
          >
            Connect with Your College Seniors
          </h2>

          {/* New Para */}
          <p
            className="text-lg sm:text-xl text-gray-100 font-medium leading-relaxed 
               max-w-3xl mx-auto mb-8 text-center"
          >
            <span className="text-blue-400 font-semibold">
              Connect with your seniors
            </span>{" "}
            — get{" "}
            <span className="text-purple-400 font-semibold">
              personalized 1:1 guidance
            </span>
            , Resume reviews, improve your{" "}
            <span className="text-pink-400 font-semibold">CGPA</span>, placement
            guidance, what actually happens in <span className="text-pink-400 font-semibold">college interview</span>, how to get <span className="text-pink-400 font-semibold">internship</span>, and unlock better career opportunities than other
            students!
          </p>

          {/* ✅ Connect Button with navigate */}
          <div className="flex justify-center">
            <button
              onClick={() => navigate("/connect")}
              className="flex items-center gap-2 px-8 py-3 rounded-full 
               bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 
               text-white font-semibold text-lg shadow-lg hover:shadow-2xl 
               transform transition-transform duration-300 hover:-translate-y-1"
            >
              <BsFillPeopleFill className="text-xl" />
              Connect With Us
            </button>
          </div>
        </div>

        {/* Branch Filters */}
        <div className="flex flex-wrap gap-3 justify-center sm:justify-start mb-8">
          {branches.map((branch) => (
            <button
              key={branch}
              className={`px-5 py-2 rounded-full font-medium transition-all duration-300
                ${
                  selectedBranch === branch
                    ? "bg-blue-600 text-white shadow-lg"
                    : "bg-gray-200 text-gray-700 hover:bg-blue-500 hover:text-white"
                }`}
              onClick={() => setSelectedBranch(branch)}
            >
              {branch}
            </button>
          ))}
          {selectedBranch && (
            <button
              className="px-4 py-2 rounded-full bg-red-500 text-white hover:bg-red-600 transition duration-300 font-medium"
              onClick={() => setSelectedBranch("")}
            >
              Clear Filter
            </button>
          )}
        </div>

        {/* Senior Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredSeniors.length > 0 ? (
            filteredSeniors.map((senior) => (
              <SeniorCard key={senior.id} senior={senior} />
            ))
          ) : (
            <p className="text-gray-500 col-span-full text-center">
              No seniors found for this branch.
            </p>
          )}
        </div>
        <p className="text-gray-100 text-center mt-10 max-w-3xl mx-auto text-lg sm:text-xl leading-relaxed">
  <span className="text-blue-400 font-semibold">Learn from seniors</span> about the types of companies that visit college—<span className="text-yellow-400 font-semibold">IT services, product firms, startups, and core engineering</span>. Discover where seniors are working, how to get <span className="text-purple-400 font-semibold">internships quickly</span>, and the <span className="text-pink-400 font-semibold">skills in high demand</span> to succeed in placements!
</p>

      </div>
    </div>
  );
};

export default ConnectSeniors;
