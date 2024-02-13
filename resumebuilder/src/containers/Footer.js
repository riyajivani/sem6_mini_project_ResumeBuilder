import React from "react";
import Logo from '../assets/logo1.png'
import {Link} from 'react-router-dom'

const Footer = () => {
  return (
    <div className="w-full flex items-center justify-between border-t border-gray-300">

      <div className="flex items-center justify-center gap-3 py-3">
        <img src={Logo} className="w-10 h-10 object-contain" alt="" />
        <p className="text-xs">©All Rights Resrved By RIYA JIVANI</p>  
      </div>

      <div className="flex items-center justify-center gap-6">
        <Link to={"/"} className='text-purple-700 text-sm'>Home</Link>
        <Link to={"/"} className='text-purple-700 text-sm'>Contact</Link>
        <Link to={"/"} className='text-purple-700 text-sm whitespace-nowrap'>Privacy Policy</Link>
      </div>

      </div>
  );
};

export default Footer;
