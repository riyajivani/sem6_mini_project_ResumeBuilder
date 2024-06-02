import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Tooltip } from 'antd';
const dburl = process.env.REACT_APP_URL

const UserProfile = () => {

  const [userTemplate, setUserTemplate] = useState([]);
  // const [showDetail, setShowDetail] = useState(false);
  const user = JSON.parse(localStorage.getItem("loggedInUser"));
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTemplate = async () => {
      try {
        const response = await axios.get(`${dburl}/getusertemplates/${user?.userId}`);
        console.log(response);
        setUserTemplate(response.data);
      } catch (error) {
        console.error('Error fetching template details:', error);
      }
    }

    fetchTemplate();
  }, [])

  const handleShowResume = (template) => {
    navigate(`/home/resume/${template?.name}?templateId=${template?.id}`);
  }

  const handleEditDetails = async () => {

    try {

      await axios.delete(`${dburl}/deletedetails/${user?.userId}`);

      await axios.delete(`${dburl}/deleteexperiences/${user?.userId}`);

      await axios.delete(`${dburl}/deleteeducations/${user?.userId}`);

      await axios.delete(`${dburl}/deleteskills/${user?.userId}`);

      navigate('/userdetail');

    } catch (error) {
      console.error('Error deleting user details:', error);
    }

    navigate("/userdetail");
  }

  return (
    <div className='flex flex-col overflow-hidden my-1'>

      <div className='flex flex-col items-center justify-start border-b-4 border-purple-700'>
        <div className='w-full h-28 relative' style={{ background: "url(https://cdn.pixabay.com/photo/2018/05/04/15/23/poppies-3374193_1280.jpg)", backgroundPosition: "bottom", backgroundSize: "fit", }}>
          <div className='absolute inset-0 bg-[rgba(0,0,0,0.6)]'>{/*for black layer*/}</div>
        </div>
        <div className="px-3 w-fit absolute rounded-full mt-20 bg-white shadow-md">
          <p className="text-6xl text-purple-950">{user?.email[0].toUpperCase()}</p>
        </div>
      </div>

      <div className='flex flex-col justify-center items-center mt-10 gap-2'>
        <p className='text-lg text-purple-950'>Welcome, {user?.email}</p>
        <div className='flex flex-row items-center gap-6'>
          <button className='w-fit p-2 rounded-md text-white bg-purple-950'>Used Template</button>

          {/* <button className='w-fit p-2 rounded-md text-white bg-purple-700'> Your Details</button> */}

          <Tooltip title="adding new details might override your existing detail" color="red" placement='right'>
            <button className="w-fit p-2 rounded-md text-white hover:bg-purple-950 bg-purple-700" onClick={handleEditDetails}>Edit Details</button>
          </Tooltip>

        </div>
      </div>

      <div className='rounded-md border border-purple-200 m-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 2xl:grid-cols-5 gap-4 p-2'>

        {userTemplate && userTemplate.map((template, index) => (
          <div key={index} className='w-fit h-[250px] 2xl:h-[320px] rounded-md bg-gray-200 overflow-hidden relative'>
            <img src={template?.url} className="w-full h-full object-fill hover:opacity-50" alt="" onClick={() => handleShowResume(template)} />
          </div>
        ))}

      </div>

    </div>
  )
}

export default UserProfile