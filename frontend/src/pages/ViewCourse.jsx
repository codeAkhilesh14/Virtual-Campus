import React, { useState, useEffect } from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setSelectedCourse } from "../redux/courseSlice";
import img from "../assets/empty.jpg";
import { FaStar } from "react-icons/fa6";
import { FaPlayCircle } from "react-icons/fa";
import { FaLock } from "react-icons/fa";
import axios from "axios";
import { serverUrl } from "../App";
import Card from "../components/Card";
import { toast } from "react-toastify";
import { ClipLoader } from "react-spinners";
import { FaFilePdf } from "react-icons/fa6";

const ViewCourse = () => {
  const navigate = useNavigate();
  const { courseId } = useParams();
  const { courseData } = useSelector((state) => state.course);
  const { selectedCourse } = useSelector((state) => state.course);
  const { userData } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [selectedLecture, setSelectedLecture] = useState(null);
  const [creatorData, setCreatorData] = useState(null);
  const [creatorCourses, setCreatorCourses] = useState(null);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchCourseData = async () => {
    courseData.map((course) => {
      if (course._id === courseId) {
        dispatch(setSelectedCourse(course));
        console.log(selectedCourse);
        return null;
      }
    });
  };

  useEffect(() => {
    const handleCreator = async () => {
      if (selectedCourse?.creator) {
        try {
          const result = await axios.post(
            serverUrl + "/api/course/creator",
            { userId: selectedCourse?.creator },
            { withCredentials: true }
          );
          setCreatorData(result.data);
          // console.log("Creator data:", result.data);
          setCreatorData(result.data);
        } catch (error) {
          console.log("Error fetching creator data:", error);
        }
      }
    };
    handleCreator();
  }, [selectedCourse]);

  const checkEnrollment = () => {
    if (!userData?.enrolledCourses) return;
    const verify = userData.enrolledCourses.some(
      (c) =>
        (typeof c === "string" ? c : c._id).toString() === courseId?.toString()
    );
    setIsEnrolled(verify);
  };

  useEffect(() => {
    setIsEnrolled(false);
    fetchCourseData();
    checkEnrollment();
  }, [courseData, courseId, userData]);

  useEffect(() => {
    if (creatorData?._id && courseData.length > 0) {
      const creatorCourse = courseData.filter(
        (course) =>
          course.creator === creatorData?._id && course._id !== courseId
      );
      setCreatorCourses(creatorCourse);
    }
  }, [creatorData, courseData]);

  const handleEnroll = async (userId, courseId) => {
    try {
      const orderData = await axios.post(
        serverUrl + "/api/order/razorpay-order",
        { userId, courseId },
        { withCredentials: true }
      );
      // console.log(orderData);

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: orderData.data.amount,
        currency: "INR",
        name: "VIRTUAL CAMPUS",
        description: "COURSE ENROLLMENT PAYMENT",
        order_id: orderData.data.id,
        handler: async function (response) {
          console.log("Razorpay Response: ", response);
          try {
            const verifyPayment = await axios.post(
              serverUrl + "/api/order/verifypayment",
              { ...response, courseId, userId },
              { withCredentials: true }
            );
            setIsEnrolled(true);
            toast.success(verifyPayment.data.message);
          } catch (error) {
            toast.error(error.response.data.message);
            toast.error("Payment verification failed");
          }
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.log(error);
    }
  };

  const handleReview = async () => {
    setLoading(true);
    try {
      // fetching the createReview api
      const result = await axios.post(
        serverUrl + "/api/review/createreview",
        { rating, comment, courseId },
        { withCredentials: true }
      );
      setLoading(false);
      toast.success("Review Added Successfully");
      // console.log(result.data);
      setRating(0);
      setComment("");
    } catch (error) {
      console.log(error);
      setLoading(false);
      toast.error(error.response.data.message);
      setRating(0);
      setComment("");
    }
  };

  const calculateAvgReview = (reviews) => {
    if (!reviews || reviews.length === 0) {
      return 0;
    }
    const total = reviews.reduce((sum, review) => sum + review.rating, 0);
    return (total / reviews.length).toFixed(1); // toFixed(1) se points me nhi aayega
  };

  const avrRating = calculateAvgReview(selectedCourse?.reviews);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto bg-white shadow-md rounded-xl p-6 space-y-6 relative">
        {/* top section */}
        <div className="flex flex-col md:flex-row gap-6">
          {/* thumbnail */}
          <div className="w-full md:w-1/2">
            <FaArrowLeftLong
              className="text-[black] w-[22px] h-[22px] cursor-pointer"
              onClick={() => navigate("/")}
            />
            {selectedCourse?.thumbnail ? (
              <img
                src={selectedCourse?.thumbnail}
                alt=""
                className="rounded-xl w-full object-cover"
              />
            ) : (
              <img
                src={img}
                alt=""
                className="rounded-xl w-full object-cover"
              />
            )}
          </div>

          {/* course Info */}
          <div className="flex-1 space-y-2 mt-[20px]">
            <h2 className="text-2xl font-bold">{selectedCourse?.title}</h2>
            <p className="text-gray-600">{selectedCourse?.subTitle}</p>

            <div className="flex items-start flex-col justify-between">
              <div className="text-yellow-500 font-medium flex gap-2">
                <span className="flex items-center justify-start gap-1">
                  <FaStar /> {avrRating}
                </span>
                <span className="text-gray-400">(1,200 Reviews)</span>
              </div>

              <div>
                <span className="text-xl font-semibold text-black">
                  ₹{selectedCourse?.price}
                </span>{" "}
                <span className="line-through text-sm text-gray-400">₹199</span>
              </div>

              <ul className="text-sm text-gray-700 space-y-1 pt-2">
                <li>✅ Complete coverage of all units</li>
                <li>✅ Lifetime access to course materials</li>
              </ul>

              {!isEnrolled ? (
                <button
                  className="bg-[black] text-white px-6 py-2 rounded hover:bg-gray-700 mt-3 cursor-pointer"
                  onClick={() => handleEnroll(userData._id, courseId)}
                >
                  Enroll Now
                </button>
              ) : (
                <button
                  className="bg-green-100 text-green-500 px-6 py-2 rounded hover:bg-gray-700 mt-3 cursor-pointer"
                  onClick={() => navigate(`/viewlecture/${courseId}`)}
                >
                  Watch Now
                </button>
              )}

              {/* 🎉 Offer Banner */}
              <div className="mt-4 p-4 rounded-xl bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 text-white shadow-md text-left w-[90%] md:w-[80%]">
                <h3 className="font-bold text-xl">🔥 Special Offer!</h3>
                <p className="text-m">
                  First <span className="font-bold">5 students</span> get
                  <span className="font-semibold">
                    {" "}
                    free 1:1 senior guidance 🎓
                  </span>
                </p>
                <p className="text-sm mt-1 font-medium">
                  Grab your spot now 🚀
                </p>
              </div>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">What You'll Learn</h2>
          <ul>
            <li>Learn {selectedCourse?.category} from Beginning</li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">Who This Course is For</h2>
          <p className="text-gray-700">
            {selectedCourse?.description}
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          <div className="bg-white w-full md:w-2/5 p-6 rounded-2xl shadow-lg border border-gray-200">
            <h2 className="text-xl font-bold mb-1 text-gray-800">
              Course Curriculum
            </h2>
            <p className="text-sm text-gray-500 mb-4">
              {selectedCourse?.lectures?.length} Modules
            </p>
            <div className="flex flex-col gap-3">
              {selectedCourse?.lectures?.map((lecture, index) => {
                const isPdf = lecture?.videoUrl?.toLowerCase().endsWith(".pdf");
                return (
                  <button
                    key={index}
                    disabled={!lecture.isPreviewFree}
                    onClick={() => {
                      if (lecture.isPreviewFree) setSelectedLecture(lecture);
                    }}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg border transition-all
        duration-200 text-left ${
          lecture.isPreviewFree
            ? "hover:bg-gray-100 cursor-pointer border-gray-300"
            : "cursor-not-allowed opacity-60 border-gray-200"
        } ${
                      selectedLecture?.lectureTitle === lecture?.lectureTitle
                        ? "bg-gray-100"
                        : ""
                    } `}
                  >
                    <span className="text-lg text-gray-700">
                      {lecture.isPreviewFree ? (
                        isPdf ? (
                          <FaFilePdf className="text-red-500" />
                        ) : (
                          <FaPlayCircle />
                        )
                      ) : (
                        <FaLock />
                      )}
                    </span>
                    <span className="text-sm font-medium text-gray-600">
                      {lecture.lectureTitle}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
          <div className="bg-white w-full md:w-3/5 p-6 rounded-2xl shadow-lg border border-gray-200">
            <div
              className="aspect-video w-full rounded-lg overflow-hidden mb-4 bg-black flex items-center
                    justify-center"
            >
              {selectedLecture?.videoUrl ? (
                selectedLecture.videoUrl.toLowerCase().endsWith(".pdf") ? (
                  // 📄 PDF file preview
                  <iframe
                    src={selectedLecture.videoUrl}
                    title="PDF Preview"
                    className="w-full h-full"
                  ></iframe>
                ) : (
                  // 🎥 Video file preview
                  <video
                    className="w-full h-full object-cover"
                    src={selectedLecture.videoUrl}
                    controls
                  />
                )
              ) : (
                <span className="text-white text-sm">
                  Select a preview lecture to watch
                </span>
              )}
            </div>
          </div>
        </div>

        {/* {course review section} */}

        <div className="mt-8 border-t pt-6">
          <h2 className="text-xl font-semibold mb-2">Write a Reviews</h2>
          <div className="mb-4">
            <div className="flex gap-1 mb-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <FaStar
                  key={star}
                  className={
                    star <= rating ? "fill-amber-300" : "fill-gray-300"
                  }
                  onClick={() => setRating(star)}
                />
              ))}
            </div>
            <textarea
              className="w-full border border-gray-300 rounded-lg p-2"
              placeholder="Write your review here..."
              rows={3}
              onChange={(e) => setComment(e.target.value)}
              value={comment}
            />

            <button
              className="bg-black text-white mt-3 px-4 py-2 rounded hover:bg-gray-800"
              disabled={loading}
              onClick={handleReview}
            >
              {loading ? <ClipLoader size={30} color="white" /> : "Submit"}
            </button>
          </div>
        </div>

        {/* for creator info */}

        <div className="flex items-center gap-4 pt-4 border-t">
          {creatorData?.photoUrl ? (
            <img
              src={creatorData?.photoUrl}
              alt="user"
              className="border-1 border-gray-200 w-16 h-16 rounded-full object-cover"
            />
          ) : (
            <img
              src={img}
              alt="user"
              className="border-1 border-gray-200 w-16 h-16 rounded-full object-cover"
            />
          )}
          <div>
            <h2 className="text-lg font-semibold">{creatorData?.name}</h2>
            <p className="md:text-sm text-gray-600 text-[10px]">
              {creatorData?.description}
            </p>
            <p className="md:text-sm text-gray-600 text-[10px]">
              {creatorData?.email}
            </p>
          </div>
        </div>

        <div>
          <p className="text-xl font-semibold mb-2">
            Other Published Courses by the Educator -
          </p>
        </div>

        <div
          className="w-full transition-all duration-200 py-[20px] flex items-start justify-center lg:justify-start
        flex-wrap gap-6 lg:px-[80px]"
        >
          {creatorCourses?.map((course, index) => (
            <Card
              key={index}
              thumbnail={course.thumbnail}
              id={course._id}
              price={course.price}
              title={course.title}
              category={course.category}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ViewCourse;
