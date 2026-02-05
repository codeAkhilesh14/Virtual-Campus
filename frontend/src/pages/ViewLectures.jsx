import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { serverUrl } from '../App';
import { FaArrowLeftLong, FaFilePdf, FaCirclePlay } from 'react-icons/fa6';
import SimplePdfViewer from '../components/SimplePdfViewer';

const ViewLectures = () => {
  const { courseId } = useParams();
  const { courseData } = useSelector((state) => state.course);
  const navigate = useNavigate();

  const selectedCourse = courseData?.find((course) => course._id === courseId);
  const [creatorData, setCreatorData] = useState(null);
  const [selectedLecture, setSelectedLecture] = useState(selectedCourse?.lectures?.[0] || null);

  // Fetch educator info
  useEffect(() => {
    const handleCreator = async () => {
      if (selectedCourse?.creator) {
        try {
          const result = await axios.post(
            serverUrl + '/api/course/creator',
            { userId: selectedCourse?.creator },
            { withCredentials: true }
          );
          setCreatorData(result.data);
        } catch (error) {
          console.log('Error fetching creator data:', error);
        }
      }
    };
    handleCreator();
  }, [selectedCourse]);

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex flex-col md:flex-row gap-6">
      {/* Left / Top section */}
      <div className="w-full md:w-2/3 bg-white rounded-2xl shadow-md p-6 border border-gray-200 flex flex-col gap-4">
        <div className="mb-4">
          <h2 className="text-2xl font-bold flex items-center gap-4 text-gray-800">
            <FaArrowLeftLong
              className="text-black w-6 h-6 cursor-pointer"
              onClick={() => navigate('/')}
            />
            {selectedCourse?.title}
          </h2>
          <div className="mt-2 flex gap-4 text-sm text-gray-500 font-medium">
            <span>Category: {selectedCourse?.category}</span>
            <span>Level: {selectedCourse?.level}</span>
          </div>
        </div>

        {/* Video / PDF Player */}
        <div className="aspect-video bg-black rounded-xl overflow-hidden flex items-center justify-center w-full h-full">
          {selectedLecture?.videoUrl ? (
            selectedLecture.videoUrl.toLowerCase().endsWith('.pdf') ? (
              <SimplePdfViewer url={selectedLecture.videoUrl} />
            ) : (
              <video className="w-full h-full object-cover" src={selectedLecture.videoUrl} controls />
            )
          ) : (
            <div className="flex items-center justify-center h-full text-white">
              Select a lecture to start watching
            </div>
          )}
        </div>

        {/* Selected Lecture Title */}
        <div>
          <h2 className="text-xl font-semibold text-gray-800">{selectedLecture?.lectureTitle}</h2>
        </div>
      </div>

      {/* Right / Bottom section */}
      <div className="w-full md:w-1/3 bg-white rounded-2xl shadow-md p-6 border border-gray-200 h-fit flex flex-col">
        <h2 className="text-xl font-bold mb-4 text-gray-800">All Lectures</h2>
        <div className="flex flex-col gap-3 mb-6">
          {selectedCourse?.lectures?.length > 0 ? (
            selectedCourse.lectures.map((lecture, index) => (
              <button
                key={index}
                onClick={() => setSelectedLecture(lecture)}
                className={`flex items-center justify-between p-3 rounded-lg border transition text-left ${
                  selectedLecture?._id === lecture._id
                    ? 'bg-gray-200 border-gray-500'
                    : 'hover:bg-gray-50 border-gray-300'
                }`}
              >
                <h2 className="text-sm font-semibold text-gray-800">{lecture.lectureTitle}</h2>
                {lecture.videoUrl?.toLowerCase().endsWith('.pdf') ? (
                  <FaFilePdf className="text-lg text-red-600" />
                ) : (
                  <FaCirclePlay className="text-lg text-black" />
                )}
              </button>
            ))
          ) : (
            <p className="text-gray-500">No lectures available.</p>
          )}
        </div>

        {/* Educator info */}
        {creatorData && (
          <div className="mt-auto border-t pt-4">
            <h3 className="text-md font-semibold text-gray-700 mb-3">Educator</h3>
            <div className="flex items-center gap-4 mb-2">
              <img
                src={creatorData?.photoUrl}
                alt="educator"
                className="w-14 h-14 object-cover rounded-full"
              />
              <div>
                <h2 className="text-base font-medium text-gray-800">{creatorData?.name}</h2>
                <p className="text-sm text-gray-600">{creatorData?.description}</p>
                <p className="text-sm text-gray-600">{creatorData?.email}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewLectures;