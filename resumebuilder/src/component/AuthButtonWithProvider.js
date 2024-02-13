import React from 'react'
import { FaChevronRight } from 'react-icons/fa6'
import { toast } from 'react-toastify';

const AuthButtonWithProvider = ({ Icon, label, provider }) => {
  
  const handleClick = async () => {
    switch (provider) {
      case "GoogleAuthProvider":
        toast("inside google auth");
        break;
      
      case "GithubAuthProvider":
        toast("inside github auth");
        break;
      
      default:
        toast("inside google auth");
        break;
    }
  };

  return (
       <div onClick={handleClick} className='w-full px-4 py-3 rounded-md border-2 border-purple-700 flex items-center justify-between cursor-pointer group hover:bg-purple-700 active:scale-95 duration-150 shadow-md'>
            <Icon className='text-txtPrimarytext-xl group-hover:text-white' />
            <p className='text-txtPrimarytext-lg group-hover:text-white'>{ label }</p>  
          <FaChevronRight className='text-txtPrimary text-base group-hover:text-white'/>
       </div>
  )
}

export default AuthButtonWithProvider