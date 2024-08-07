import React, { useState } from "react";
import Logo from '../assets/Picture1.png';
import { Footer } from "../component";
import { FaChevronRight } from 'react-icons/fa6'
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const dburl = process.env.REACT_APP_URL

const Authentication = () => {

  const [user, setUser] = useState({
    email: '',
    password: ''
  })
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post(`${dburl}/login`, {
        email: user.email,
        password: user.password
      })

      console.log(res);
      localStorage.setItem("loggedInUser", JSON.stringify(res.data));
      navigate("/home")
    }
    catch (e) {
      toast("signup first");
      console.log(e);
    }
  }

  const handleSignUp = async () => {
    try {
      const res = await axios.post(`${dburl}/signup`, {
        email: user.email,
        password: user.password
      })

      console.log(res);
      toast("now log in please !")
    } catch (e) {
      console.log(e);
    }
  }

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
    console.log(user);
  }

  return (
    // <div className="auth-section">
    <div className="w-full h-fit overflow-hidden flex flex-col items-start justify-start px-6 py-4 gap-6">
      {/* top section */}
      <img src={Logo} className="w-12 h-auto object-contain" alt="" />


      {/* main section */}
      <div className="w-full flex flex-1 flex-col items-center justify-center gap-6">
        <h1 className="text-3xl lg:text-4xl text-purple-700">Welcome to RESUME BUILDER</h1>
        <p className="text-base text-gray-600">let's create resume</p>
        <h2 className="text-2xl text-gray-600">Authenticate</h2>

        <div className="w-full lg:w-96 rounded-md p-2 flex flex-col items-center justify-start gap-6">
          <input type='email' name="email" onChange={handleChange} placeholder="enter email" className="w-full text-txtPrimary text-xl px-4 py-3 rounded-md border-2 border-purple-700 focus:border-purple-600 focus:outline-none shadow-md bg-transparent" />
          <input type='password' name="password" onChange={handleChange} placeholder="enter password" className="w-full text-txtPrimary text-xl px-4 py-3 rounded-md border-2 border-purple-700 focus:border-purple-600 focus:outline-none shadow-md bg-transparent" />

          <button onClick={handleLogin} className="w-52 px-4 py-3 rounded-md border-2 border-purple-700 bg-purple-700 flex justify-between items-center cursor-pointer group hover:bg-purple-600 hover:border-purple-600 active:scale-95 duration-150 shadow-md'">
            <p className='text-txtPrimarytext-lg text-white'>Log In</p>
            <FaChevronRight className='text-white text-base' />
          </button>

          <button onClick={handleSignUp} className="w-52 px-4 py-3 rounded-md border-2 border-purple-700 bg-purple-700 flex justify-between items-center cursor-pointer group hover:bg-purple-600 hover:border-purple-600 active:scale-95 duration-150 shadow-md'">
            <p className='text-txtPrimarytext-lg text-white'>Create Account</p>
            <FaChevronRight className='text-white text-base' />
          </button>
        </div>

      </div>


      {/* footer section */}
      <Footer />

    </div>
  );
};

export default Authentication;
