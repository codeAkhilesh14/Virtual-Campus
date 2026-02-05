import React from 'react'
import Nav from '../components/Nav'
import home from "../assets/home1.jpg"
import { SiViaplay } from "react-icons/si"
import ai from "../assets/ai.png"
import ai1 from "../assets/SearchAi.png"
import Logos from '../components/Logos'
import ExploreCourses from '../components/ExploreCourses'
import CardPage from '../components/CardPage'
import { useNavigate } from 'react-router-dom';
import About from '../components/About'
import Footer from '../components/Footer'
import ReviewPage from '../components/ReviewPage'
import { BsFillPeopleFill } from "react-icons/bs";
import { GiJetFighter } from "react-icons/gi";

const Home = () => {

  const navigate = useNavigate()

  return (
    <div className='w-[100%] overflow-hidden'>
      <div className='w-[100%] lg:h-[140vh] h-[70vh] relative'>

        <Nav />

        <img src={home} alt="home" className='object-cover md:object-fill w-[100%] lg:h-[100%] h-[50vh]'></img>

        <span className='lg:text-[70px] absolute md:text-[40px] lg:top-[10%] top-[15%] w-[100%] 
        flex items-center justify-center text-white font-bold text-[20px]'>
          Grow Your Skills to Advance
          </span>
        <span className='lg:text-[70px] absolute md:text-[40px] lg:top-[18%] top-[20%] w-[100%] 
        flex items-center justify-center text-white font-bold text-[20px]'>
          Your Carrer Path
        </span>

        <div className='absolute lg:top-[30%] top-[75%] md:top-[80%] w-[100%] flex items-center justify-center 
        gap-3 flex-wrap'>
          <button className='px-[20px] py-[10px] border-2 lg:border-white border-black
          lg:text-white text-black rounded-[10px] text-[18px] font-light flex gap-2 cursor-pointer'
          onClick={()=>navigate('/allcourses')}>
            View All Courses <SiViaplay className='w-[30px] h-[30px] lg:fill-white fill-black' />
          </button>
          <button className='px-[20px] py-[10px] lg:bg-[white] bg-black lg:text-black text-white rounded-[10px] 
          text-[18px] font-light flex gap-2 cursor-pointer items-center justify-center' onClick={()=>navigate("/search")}>
            Search With AI
            <img src={ai} alt="ai" className='w-[30px] h-[30px] rounded-full hidden lg:block'/>
            <img src={ai1} alt="ai" className='w-[35px] h-[35px] rounded-full lg:hidden'/>
          </button>
          {/* ✅ Daily Challenge Button */}
          <button
            className='px-[20px] py-[10px] lg:bg-blue-600 bg-blue-500 text-white rounded-[10px] 
            text-[18px] font-light hover:bg-blue-700 transition-all flex gap-2 items-center justify-center'
            onClick={() => navigate('/daily-challenge')}
          >
            Daily Challenge <GiJetFighter />
          </button>
          <button
            className='px-[20px] py-[10px] lg:bg-green-500 bg-green-500 text-white rounded-[10px] 
            text-[18px] font-light hover:bg-green-600 transition-all flex gap-2 items-center justify-center'
            onClick={() => navigate('/connect-seniors')}
          >
            Connect with Seniors <BsFillPeopleFill /> 
          </button>

        </div>

      </div>

      <div className='mt-35'></div>

      <Logos />
      <ExploreCourses />
      <CardPage />
      <About />
      <ReviewPage />
      <Footer />

    </div>
  )
}

export default Home
