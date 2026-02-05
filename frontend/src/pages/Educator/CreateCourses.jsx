import React, { useState } from 'react'
import { FaArrowLeftLong } from 'react-icons/fa6'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { serverUrl } from '../../App'
import { ClipLoader } from 'react-spinners'
import { toast } from 'react-toastify'; 

const CreateCourses = () => {

  const navigate = useNavigate()
  const [title, setTitle] = useState("")
  const [category, setCategory] = useState("")
  const [loading, setLoading] = useState(false)

  const handleCreateCourse = async () => {
    setLoading(true)
    try {
      const result = await axios.post(serverUrl + '/api/course/create', {title, category}, {withCredentials: true})
      // console.log(result.data)
      navigate('/courses')
      setLoading(false)
      toast.success("Course Created Successfully")
    } catch(error) {
      console.log(error)
      setLoading(false)
      toast.error(error.response.data.message)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 py-10">
      <div className='max-w-xl w-[600px] mx-auto p-6 bg-white shadow-md rounded-md mt-10 relative'>
        <FaArrowLeftLong className='w-[22px] absolute top-[8%] left-[5%] h-[22px] cursor-pointer' 
        onClick={()=>navigate('/courses')}/>
        <h2 className='text-2xl font-semibold mb-6 text-center'>Create Course</h2>
        <form className='space-y-5' onSubmit={(e)=>e.preventDefault()}>
          <div>
            <label htmlFor="title" className='block text-sm font-medium text-gray-700 mb-1'>Course Title</label>
            <input type="text" id="title" placeholder='Enter Course Title'
            className='w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none
            focus:ring-2 focus:ring-[black]'
            onChange={(e)=>setTitle(e.target.value)} value={title}/>
          </div>
          <div>
            <label htmlFor="cat" className='block text-sm font-medium text-gray-700 mb-1'>Course Category</label>
            <select id="cat" className='w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none
            focus:ring-2 focus:ring-[black]'
            onChange={(e)=>setCategory(e.target.value)}>
              <option value="">Select Category</option>
              <option value="Btech 1st Year">Btech 1st Year</option>
              <option value="Btech 2nd Year">Btech 2nd Year</option>
              <option value="Btech 3rd Year">Btech 3rd Year</option>
              <option value="Btech 4th Year">Btech 4th Year</option>
              <option value="Btech (Honours Degree)">Btech (Honours Degree)</option>
              <option value="App Development">App Development</option>
              <option value="AI/ML">AI Tools</option>
              <option value="Data Science">Data Science</option>
              <option value="Data Analytics">Data Analytics</option>
              <option value="Devops">DevOps</option>
              <option value="Ethical Hacking">Ethical Hacking</option>
              <option value="UI UX Designing">UI UX Designing</option>
              <option value="Web Development">Web Development</option>
              <option value="Others">Others</option>
            </select>
          </div>
          <button className='w-full bg-[black] text-white py-2 px-4 rounded-md active:bg-[#3a3a3a] transition' disabled={loading}
          onClick={handleCreateCourse}>{loading ? <ClipLoader size={30} color='white'/> : "Create"}</button>
        </form>
      </div>
    </div>
  )
}

export default CreateCourses
