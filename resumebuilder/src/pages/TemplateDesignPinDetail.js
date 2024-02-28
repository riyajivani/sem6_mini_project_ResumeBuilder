import React from 'react'
import { Link } from 'react-router-dom'
import { FaHouse } from 'react-icons/fa6'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const TemplateDesignPinDetail = () => {

  const data = JSON.parse(localStorage.getItem("ChosenTemplate"));
  const navigate = useNavigate();

  const handleUseTemplate = async () => {
    const id = JSON.parse(localStorage.getItem("loggedInUser"))?.userId;
    try {
      console.log(data);
      const res = await axios.post(`http://localhost:8080/storeusertemplate/${id}`, data)
      console.log(res.data);
      navigate('/userdetail');
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <div className='w-full flex flex-col items-center justify-start px-4 py-12'>

      {/* bread crump */}
      <div className='w-full flex items-center pb-8 gap-2'>

        <Link to={"/home"} className='flex items-center justify-center gap-2 text-txtPrimary'>
          <FaHouse />Home
        </Link>
        <p>/</p>
        <p>{data?.name}</p>
      </div>

      {/* design main section layout */}
      <div className='w-full grid grid-cols-1 lg:grid-cols-12'>
        {/* left section */}
        <div className='col-span-1 lg:col-span-8 flex flex-col items-start justify-start gap-4'>

          {/* load the template image */}

          <img className='w-full h-auto object-contain rounded-md' src={data?.url} alt='' />

        </div>

        {/* right section */}
        <div className='col-span-1 lg:col-span-4 w-full flex flex-col items-center justify-start px-3 py-2 lg:py-0 gap-6'>

          {/* discovere more */}
          <div className='w-full h-72 bg-blue-200 rounded-md overflow-hidden relative' style={{ background: "url(https://cdn.pixabay.com/photo/2018/05/04/15/23/poppies-3374193_1280.jpg)", backgroundPosition: "center", backgroundSize: "cover" }}>

            <div className='absolute inset-0 flex items-center justify-center bg-[rgba(0,0,0,0.4)]'>
              <Link to={"/home"} className='px-4 py-2 rounded-md border-2 border-gray-50 text-white'>
                Discover More
              </Link>
            </div>

          </div>

          {/* edit the template */}

          <div onClick={handleUseTemplate} className='w-full px-4 py-3 rounded-md flex items-center justify-center bg-purple-800 cursor-pointer'>
            <p className='text-white font-semibold text-lg'>Edit this template</p>
          </div>

        </div>
      </div>


    </div >
  )
}

export default TemplateDesignPinDetail