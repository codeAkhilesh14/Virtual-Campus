import { React, useState } from 'react'
import logo from '../assets/logo.jpg'
import google from '../assets/google.jpg'
import { IoEyeOutline } from "react-icons/io5"
import { IoEye } from "react-icons/io5"
import { useNavigate } from 'react-router-dom'
import { ClipLoader } from 'react-spinners'
import { toast } from 'react-toastify'
import { serverUrl } from '../App'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { setUserData } from '../redux/userSlice'
import { signInWithPopup } from 'firebase/auth'
import { auth, provider } from '../../utils/firebase'

const Login = () => {

    const [show, setShow] = useState(false);
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [loading, setLoading] = useState(false);

    const dispatch = useDispatch();

    const handleLogin = async () => {

      setLoading(true);

      try {
        const result = await axios.post(serverUrl + "/api/auth/login", { email, password }, { withCredentials: true });
        dispatch(setUserData(result.data));
        setLoading(false);
        navigate("/")
        toast.success("Login Successful")
      } catch (error) {
        console.error("Error occurred during login:", error);
        setLoading(false);
        toast.error(error.response.data.message)
      }
    }

    const googleLogin = async () => {
      try {
        const response = await signInWithPopup(auth, provider)
        let user = response.user
        let name = user.displayName
        let email = user.email
        let role = ""

        const result = await axios.post(serverUrl + "/api/auth/googleauth", {name, email, role}, {withCredentials: true})
        dispatch(setUserData(result.data));
        navigate("/")
        toast.success("Login Successful")
      } catch(error) {
        toast.error(error.response.data.message)
      }
    }
  
    return (
      <div className='bg-[#dddbdb] w-[100vw] h-[100vh] flex justify-center items-center'>
        <form className='w-[90%] md:w-200 h-150 bg-[white] shadow-xl rounded-2xl flex' onSubmit={(e) => { e.preventDefault(); }}>
  
          {/* left div */}
  
          <div className='md:w-[50%] w-[100%] h-[100%] flex flex-col justify-center items-center gap-3'>
  
            <div>
              <h1 className='font-semibold text-[black] text-2xl'>Welcome Back</h1>
              <h2 className='text-[#999797] text-[18px]'>Sign in to your account</h2>
            </div>
  
            <div className='flex flex-col gap-1 w-[80%] items-start justify-center px-3'>
              <label htmlFor='email' className='font-semibold'>Email</label> {/* htmlFor se agar hum label pe click kare to input pe focus ho jata hai */}
              <input type="text" id='email' placeholder='Your Email' className='w-[100%] h-[35px] rounded-lg border-1 border-[#e7e6e6] text-[15px] px-[20px]' 
              onChange={(e)=>setEmail(e.target.value)}  value={email} />
            </div>
  
            <div className='flex flex-col gap-1 w-[80%] items-start justify-center px-3 relative'>
              <label htmlFor='password' className='font-semibold'>Password</label> {/* htmlFor se agar hum label pe click kare to input pe focus ho jata hai */}
              <input type={show ? "text" : "password"} id='password' placeholder='Your Password' onChange={(e)=>setPassword(e.target.value)}  value={password} className='w-[100%] h-[35px] rounded-lg border-1 border-[#e7e6e6] text-[15px] px-[20px]' />
              {show ? <IoEyeOutline className='absolute w-[20px] h-[20px] right-[5%] bottom-[10%]' onClick={()=>setShow(prev=>!prev)} /> : 
              <IoEye className='absolute w-[20px] h-[20px] right-[5%] bottom-[10%]' onClick={()=>setShow(prev=>!prev)} />}
            </div>
  
            <button className='w-[80%] h-[40px] bg-black text-white cursor-pointer flex items-center justify-center rounded-[5px]' disabled={loading}
            onClick={handleLogin}>{loading ? <ClipLoader size={30} color='white' />: "Login"}</button>

            <span className='text-[13px] cursor-pointer text-[#585757]'
            onClick={() => navigate("/forget")}>Forgot your password?</span>
  
            <div className='w-[80%] flex items-center gap-2'>
              <div className='w-[25%] h-[0.5px] bg-[#c4c4c4]'></div>
              <div className='w-[50%] text-[15px] text-[#6f6f6f] flex items-center justify-center'>Or continue</div>
              <div className='w-[25%] h-[0.5px] bg-[#c4c4c4]'></div>
            </div>
  
            <div className='w-[80%] h-[40px] border-1 border-[black] rounded-[5px] flex items-center justify-center cursor-pointer'
            onClick={googleLogin}>
              <img src={google} alt="google" className='w-[25px]' />
              <span className='text-[18px] text-gray-500'>oogle</span>
            </div>

            <div className='text-[15px] text-[#6f6f6f]'>Create new Account<span className='text-[blue] cursor-pointer' onClick={()=>navigate('/signup')}> SignUp</span></div>
  
          </div>
  
          {/* right div */}
  
          <div className='w-[50%] h-[100%] rounded-r-2xl bg-[black] md:flex flex-col justify-center items-center hidden'>
            <img src={logo} alt="logo" className='w-30 shadow-2xl' />
            <span className='text-2xl text-white'>VIRTUAL CAMPUS</span>
          </div>
  
        </form>
      </div>
    )
}

export default Login
