import React, { useState } from "react"
import { Link } from "react-router-dom"
import Logo from '../assets/Picture1.png'
import { AnimatePresence } from "framer-motion"
import { motion } from 'framer-motion'
import { AiOutlineLogout } from "react-icons/ai"
import { slideUpDownMenu, FadeInOutWithOpacity } from '../animations'
import { toast } from "react-toastify"
import { adminEmail } from "../utils/helper"
import { useNavigate } from "react-router-dom"
// const dburl = process.env.REACT_APP_URL


const Header = () => {
  const user = JSON.parse(localStorage.getItem("loggedInUser"));
  const [isMenu, setIsMenu] = useState(false);
  const navigate = useNavigate();

  const handleSignOut = () => {
    localStorage.clear("loggedInUser");
    navigate('/');
    toast("sign out successfully");
  }

  return (
    <header className="w-full flex items-center justify-between px-2 py-1 lg:px-8 border-b border-purple-300 bg-purple-200 z-50 sticky">

      {/* logo */}
      <Link to='/home'>
        <img src={Logo} className="w-16 h-auto object-contain" alt='' />
      </Link>

      {/* profile section */}
      <AnimatePresence>

        <React.Fragment>
          <motion.div {...FadeInOutWithOpacity} className="relative" onClick={() => setIsMenu(!isMenu)}>
            <div className="w-12 h-12 rounded-md relative flex items-center justify-center bg-purple-700 shadow-md cursor-pointer">
              <p className="text-4xl text-white">{user?.email[0].toUpperCase()}</p>
            </div>

            {/* drop-down menu */}
            <AnimatePresence>
              {isMenu && <motion.div {...slideUpDownMenu} onMouseLeave={() => setIsMenu(false)} className="absolute px-4 py-3 rounded-md bg-white right-0 top-14 flex flex-col items-center justify-start gap-3 w-64 pt-12">
                <div className="w-20 h-20 rounded-full relative flex items-center justify-center bg-purple-700 shadow-md cursor-pointer">
                  <p className="text-4xl text-white">{user?.email[0].toUpperCase()}</p>
                </div>


                {user?.email && (<p className="text-lg text-txtDark">{user?.email}</p>)}

                {/* menus */}
                <div className="w-full flex-col items-start flex gap-8 pt-6">
                  <Link className="text-txtLight hover:text-txtDark text-base whitespace-nowrap" to={`/home/profile/${user?.userId}`}> My Account </Link>

                  <Link className="text-txtLight hover:text-txtDark text-base whitespace-nowrap" to={`/home`}> View Templates </Link>

                  {adminEmail.includes(user?.email) &&
                    <Link className="text-txtLight hover:text-txtDark text-base whitespace-nowrap" to={"/home/template/create"}> Add new Template </Link>
                  }

                  <div onClick={handleSignOut} className="w-full px-2 py-2 border-t border-gray-300 flex items-center justify-between group cursor-pointer">
                    <p className="text-txtLight group-hover:text-txtDark">Sign Out</p>
                    <AiOutlineLogout className="text-txtLight group-hover:text-txtDark" />
                  </div>

                </div>

              </motion.div>}
            </AnimatePresence>

          </motion.div>
        </React.Fragment>
      </AnimatePresence>

    </header>
  );
}
export default Header;
