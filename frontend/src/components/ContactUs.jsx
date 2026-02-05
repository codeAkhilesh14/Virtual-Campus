import React from 'react';
import logo from "../assets/logo.jpg";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import emailjs from "emailjs-com";
import { useNavigate } from "react-router-dom";
import Nav from "../components/Nav";

function Contact() {
  const navigate = useNavigate();  

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    const templateParams = {
      from_name: data.name,
      from_email: data.email,
      message: data.message,
    };

    try {
      await emailjs.send(
        'service_vh9ya6e',
        'template_0tgw5d7',
        templateParams,
        'odHOQnBWqTkKhgeCh'
      );
      toast.success("Your message has been sent");
      reset();
      setTimeout(() => navigate("/"), 1000);
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <section
      id="contact"
      data-aos="fade-up"
      data-aos-delay="300"
      className="min-h-screen flex flex-col bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f3460]"
    >
      {/* ✅ Nav on top, responsive */}
      <header className="w-full">
        <Nav />
      </header>

      <Toaster position="top-right" reverseOrder={false} />

      {/* ✅ Contact form centered */}
      <div className="flex flex-1 items-center justify-center p-6">
        <article className="shadow-2xl rounded-xl flex flex-col md:flex-row max-w-5xl w-full overflow-hidden backdrop-blur-md bg-gray-900/70 border border-gray-700">
          {/* Left Side Image */}
          <aside className="w-full md:w-1/2 relative flex items-center justify-center p-4">
            <div className="absolute z-0 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[300px] h-[400px] rounded-full bg-gradient-to-r from-[#6d2897] via-[#8e6cf5] to-[#bb61c5] shadow-[0_0_70px_rgba(182,0,182,0.7)] blur-3xl animate-pulse"></div>
            <img
              src={logo}
              alt="Contact Illustration"
              className="relative z-10 h-[250px] sm:h-[400px] md:h-[485px] w-[300px] sm:w-[480px] object-cover rounded-lg shadow-lg transition-shadow duration-300 hover:shadow-2xl"
            />
          </aside>

          {/* Right Side Form */}
          <section className="p-8 w-full md:w-1/2 text-white">
            <header className="mb-6 text-center">
              <h2 className="text-4xl font-bold">Contact Us</h2>
              <p className="text-gray-400 mt-2">We’d love to hear from you!</p>
            </header>

            <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
              <div>
                <label htmlFor="name" className="block text-gray-300 font-medium mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  placeholder="Your name"
                  className="w-full px-4 py-4 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-200"
                  {...register("name", { required: true })}
                />
                {errors.name && <span className="text-sm text-red-400 mt-1 block">Name is required</span>}
              </div>

              <div>
                <label htmlFor="email" className="block text-gray-300 font-medium mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  placeholder="Your email"
                  className="w-full px-4 py-4 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-200"
                  {...register("email", { required: true })}
                />
                {errors.email && <span className="text-sm text-red-400 mt-1 block">Email is required</span>}
              </div>

              <div>
                <label htmlFor="message" className="block text-gray-300 font-medium mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  placeholder="Your message"
                  rows="5"
                  className="w-full px-4 py-4 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-200 resize-none"
                  {...register("message", { required: true })}
                />
                {errors.message && <span className="text-sm text-red-400 mt-1 block">Message is required</span>}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-3 px-6 rounded-full text-lg font-semibold transition-transform duration-200 transform ${
                  isSubmitting
                    ? "bg-gray-600 cursor-not-allowed"
                    : "bg-purple-700 hover:bg-purple-800 hover:scale-105 hover:shadow-[0_0_40px_rgba(128,0,128,0.7)]"
                }`}
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </button>
            </form>
          </section>
        </article>
      </div>
    </section>
  );
}

export default Contact;
