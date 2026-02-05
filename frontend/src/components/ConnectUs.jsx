import React, { useState } from "react";
import logo from "../assets/logo.jpg";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import emailjs from "emailjs-com";
import { useNavigate } from "react-router-dom";
import Nav from "../components/Nav";

function Contact() {
  const navigate = useNavigate();
  const [processing, setProcessing] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    // Basic safety check (react-hook-form already validates but extra guard)
    if (
      !data.fullName ||
      !data.email ||
      !data.branch ||
      !data.year ||
      !data.topic ||
      !data.date ||
      !data.time
    ) {
      toast.error("Please fill all required fields before proceeding.");
      return;
    }

    if (!import.meta.env.VITE_RAZORPAY_KEY_ID) {
      toast.error("Razorpay key not found. Set VITE_RAZORPAY_KEY_ID in your .env");
      return;
    }

    if (!window.Razorpay) {
      toast.error("Razorpay SDK not loaded. Add the checkout.js script to index.html");
      return;
    }

    setProcessing(true);

    try {
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: 2900, // amount in paise (₹29)
        currency: "INR",
        name: "Virtual Campus",
        description: "Senior Guidance Payment",
        image: logo, // optional
        prefill: {
          name: data.fullName,
          email: data.email,
        },
        notes: {
          branch: data.branch,
          year: data.year,
          topic: data.topic,
        },
        theme: {
          color: "#6b21a8",
        },
        handler: async function (response) {
          // response contains razorpay_payment_id (and maybe signature)
          try {
            const templateParams = {
              fullName: data.fullName,
              email: data.email,
              branch: data.branch,
              year: data.year,
              topic: data.topic,
              date: data.date,
              time: data.time,
              payment: `Paid via Razorpay (₹29) - payment_id: ${response.razorpay_payment_id}`,
            };

            await emailjs.send(
              "service_vh9ya6e",
              "template_0tgw5d7",
              templateParams,
              "odHOQnBWqTkKhgeCh"
            );

            toast.success("Payment successful! We’ll contact you soon.");
            reset();
            setTimeout(() => navigate("/"), 1800);
          } catch (err) {
            console.error("EmailJS send error:", err);
            toast.error("Payment succeeded but email failed. Please contact support.");
          } finally {
            setProcessing(false);
          }
        },
      };

      const rzp = new window.Razorpay(options);

      rzp.on("payment.failed", function (paymentFailureResponse) {
        console.error("Razorpay payment failed:", paymentFailureResponse);
        const msg =
          paymentFailureResponse?.error?.description ||
          "Payment failed. Please try another method.";
        toast.error(msg);
        setProcessing(false);
      });

      rzp.open();
    } catch (err) {
      console.error("Error opening Razorpay checkout:", err);
      toast.error("Unable to initiate payment. Try again later.");
      setProcessing(false);
    }
  };

  return (
    <section
      id="contact"
      data-aos="fade-up"
      data-aos-delay="300"
      className="min-h-screen flex flex-col bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f3460]"
    >
      {/* Nav */}
      <header className="w-full">
        <Nav />
      </header>

      <Toaster position="top-right" reverseOrder={false} />

      <div className="flex flex-1 items-center justify-center p-6 mt-15">
        <article className="shadow-2xl rounded-xl flex flex-col md:flex-row max-w-6xl w-full overflow-hidden backdrop-blur-md bg-gray-900/70 border border-gray-700">
          {/* Left Info Section */}
          <aside className="w-full md:w-1/2 flex flex-col items-center justify-center gap-6 p-6 text-center">
            <img
              src={logo}
              alt="Logo"
              className="h-[120px] w-[120px] object-cover rounded-full shadow-lg"
            />
            <h2 className="text-white text-2xl font-bold">Why Connect with Seniors?</h2>
            <ul className="text-gray-300 text-base leading-relaxed list-disc text-left">
              <li>🎯 Personalized 1:1 guidance from top performers</li>
              <li>💼 Resume & Interview preparation tips</li>
              <li>📈 CGPA improvement strategies</li>
              <li>🚀 Career roadmap & domain selection guidance</li>
              <li>🤝 Direct mentorship and college insights</li>
            </ul>
            <p className="text-yellow-300 mt-4 font-semibold text-lg">All this for just ₹29!</p>
          </aside>

          {/* Right Form Section */}
          <section className="p-8 w-full md:w-1/2 text-white">
            <header className="mb-6 text-center">
              <h2 className="text-4xl font-bold">Senior Guidance Form</h2>
              <p className="text-gray-400 mt-2">* Indicates required question</p>
            </header>

            <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
              {/* Full Name */}
              <div>
                <label className="block text-gray-300 font-medium mb-2">Full Name *</label>
                <input
                  type="text"
                  placeholder="Enter your full name"
                  className="w-full px-4 py-3 bg-gray-800 rounded-lg text-white focus:ring-2 focus:ring-purple-500 outline-none"
                  {...register("fullName", { required: true })}
                />
                {errors.fullName && <span className="text-red-400 text-sm">Full Name is required</span>}
              </div>

              {/* Email */}
              <div>
                <label className="block text-gray-300 font-medium mb-2">Email *</label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full px-4 py-3 bg-gray-800 rounded-lg text-white focus:ring-2 focus:ring-purple-500 outline-none"
                  {...register("email", { required: true })}
                />
                {errors.email && <span className="text-red-400 text-sm">Email is required</span>}
              </div>

              {/* Branch */}
              <div>
                <label className="block text-gray-300 font-medium mb-2">Branch *</label>
                <input
                  type="text"
                  placeholder="Your branch (CSE, EEE, Civil, etc.)"
                  className="w-full px-4 py-3 bg-gray-800 rounded-lg text-white focus:ring-2 focus:ring-purple-500 outline-none"
                  {...register("branch", { required: true })}
                />
                {errors.branch && <span className="text-red-400 text-sm">Branch is required</span>}
              </div>

              {/* Year */}
              <div>
                <label className="block text-gray-300 font-medium mb-2">Year *</label>
                <input
                  type="text"
                  placeholder="Your year (1st, 2nd, 3rd, 4th)"
                  className="w-full px-4 py-3 bg-gray-800 rounded-lg text-white focus:ring-2 focus:ring-purple-500 outline-none"
                  {...register("year", { required: true })}
                />
                {errors.year && <span className="text-red-400 text-sm">Year is required</span>}
              </div>

              {/* Topic */}
              <div>
                <label className="block text-gray-300 font-medium mb-2">Topic / Area You Want Guidance On *</label>
                <textarea
                  placeholder="Placement, CGPA Progress, Resume Review, Career Guidance..."
                  className="w-full px-4 py-3 bg-gray-800 rounded-lg text-white focus:ring-2 focus:ring-purple-500 outline-none resize-none"
                  rows={3}
                  {...register("topic", { required: true })}
                />
                {errors.topic && <span className="text-red-400 text-sm">Please specify a topic</span>}
              </div>

              {/* Preferred Date */}
              <div>
                <label className="block text-gray-300 font-medium mb-2">Preferred Date *</label>
                <input
                  type="date"
                  className="w-full px-4 py-3 bg-gray-800 rounded-lg text-white focus:ring-2 focus:ring-purple-500 outline-none"
                  {...register("date", { required: true })}
                />
                {errors.date && <span className="text-red-400 text-sm">Date selection is required</span>}
              </div>

              {/* Preferred Time */}
              <div>
                <label className="block text-gray-300 font-medium mb-2">Preferred Time *</label>
                <input
                  type="time"
                  className="w-full px-4 py-3 bg-gray-800 rounded-lg text-white focus:ring-2 focus:ring-purple-500 outline-none"
                  {...register("time", { required: true })}
                />
                {errors.time && <span className="text-red-400 text-sm">Time selection is required</span>}
              </div>

              {/* Optional Notes */}
              <div>
                <label className="block text-gray-300 font-medium mb-2">Additional Notes (Optional)</label>
                <textarea
                  placeholder="Enter any additional details..."
                  className="w-full px-4 py-3 bg-gray-800 rounded-lg text-white focus:ring-2 focus:ring-purple-500 outline-none resize-none"
                  rows={3}
                  {...register("payment")}
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={processing}
                className={`w-full py-3 px-6 rounded-full text-lg font-semibold transition duration-200 ${
                  processing ? "bg-gray-600 cursor-not-allowed" : "bg-purple-700 hover:bg-purple-800 hover:scale-105 hover:shadow-[0_0_30px_rgba(128,0,128,0.6)]"
                }`}
              >
                {processing ? "Processing..." : "Pay ₹29 & Connect"}
              </button>
            </form>
          </section>
        </article>
      </div>
    </section>
  );
}

export default Contact;
