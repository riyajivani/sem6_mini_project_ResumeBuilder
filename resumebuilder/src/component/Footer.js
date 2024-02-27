import React from "react";
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <div className="w-full flex items-center justify-between border-t border-gray-300">

      <div className="flex flex-col items-center justify-center">
        <p className="text-xs">©All Rights Resrved By RIYA JIVANI</p>
      </div>

      <div className="flex flex-col items-center justify-center gap-1">
        <Link to={"/"} className='text-purple-700 text-sm'>Home</Link>
        <Link to={"/"} className='text-purple-700 text-sm'>Contact</Link>
        <Link to={"/"} className='text-purple-700 text-sm whitespace-nowrap'>Privacy Policy</Link>
      </div>

    </div>
  );
};

export default Footer;
