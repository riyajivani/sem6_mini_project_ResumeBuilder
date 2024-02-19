import React, { useState } from "react"
import { Link } from "react-router-dom"
import Logo from '../assets/logo1.png'
import { AnimatePresence } from "framer-motion"
// import MainSpinner from "./MainSpinner";
import { motion } from 'framer-motion'
import { AiOutlineLogout } from "react-icons/ai"
import { slideUpDownMenu, FadeInOutWithOpacity } from '../animations'
import { toast } from "react-toastify"
import { adminEmail, FilteredData as defaultFilteredData } from '../utils/helper'

const Header = () => {
  const email = localStorage.getItem("loggedInUser");
  const [isMenu, setIsMenu] = useState(false);
  const [search, setSearch] = useState("");
  const [filteredData, setFilteredData] = useState(defaultFilteredData);

  const handleSignOut = () => {
    toast("sign out successfully");
  }

  const handleSearchItem = (e) => {

    const searched = e.target.value.toLowerCase();

    setSearch(searched);

    const filtered = defaultFilteredData.filter(item =>
      item.label.toLowerCase().includes(searched) ||
      item.value.toLowerCase().includes(searched)
    );

    setFilteredData(filtered);
    console.log(filteredData);
  }

  const clearFilter = () => { setSearch(''); }

  return (
    <header className="w-full flex item-center justify-between px-4 py-3 lg:px-8 border-b border-gray-300 bg-bgPrimary z-50 gap-12 sticky">

      {/* logo */}
      <Link to='/'>
        <img src={Logo} className="w-12 h-auto object-contain" alt='' />
      </Link>

      {/* input */}
      <div className="flex-1 border-gray-300 px-4 py-1 rounded-md flex items-center justify-between bg-gray-200">
        <input type='text' value={search} placeholder="search here..." onChange={handleSearchItem} className="flex-1 h-10 bg-transparent text-base font-semibold outline-none border-none" />
        <AnimatePresence>
          {search.length > 0 &&
            (<motion.div onClick={clearFilter} {...FadeInOutWithOpacity} className="w-8 h-8 flex items-center justify-center bg-gray-300 rounded-md cursor-pointer active:scale-95 duration-150">
              <p className="text-2xl text-black">x</p>
            </motion.div>
            )}
        </AnimatePresence>
      </div>

      {/* profile section */}
      <AnimatePresence>

        <React.Fragment>
          <motion.div {...FadeInOutWithOpacity} className="relative" onClick={() => setIsMenu(!isMenu)}>
            <div className="w-12 h-12 rounded-md relative flex items-center justify-center bg-blue-700 shadow-md cursor-pointer">
              <p className="text-4xl text-white">{email[0].toUpperCase()}</p>
            </div>

            {/* drop-down menu */}
            <AnimatePresence>
              {isMenu && <motion.div {...slideUpDownMenu} onMouseLeave={() => setIsMenu(false)} className="absolute px-4 py-3 rounded-md bg-white right-0 top-14 flex flex-col items-center justify-start gap-3 w-64 pt-12">
                <div className="w-20 h-20 rounded-full relative flex items-center justify-center bg-blue-700 shadow-md cursor-pointer">
                  <p className="text-4xl text-white">{email[0].toUpperCase()}</p>
                </div>


                {email && (<p className="text-lg text-txtDark">{email}</p>)}

                {/* menus */}
                <div className="w-full flex-col items-start flex gap-8 pt-6">
                  <Link className="text-txtLight hover:text-txtDark text-base whitespace-nowrap" to={"/profile"}> My Account </Link>

                  {adminEmail.includes(email) &&
                    <Link className="text-txtLight hover:text-txtDark text-base whitespace-nowrap" to={"/template/create"}> Add new Template </Link>
                  }

                  <div onClick={handleSignOut} className="w-full px-2 py-2 border-t border-gray-300 flex items-center justify-between group cursor-pointer">
                    <Link to={"/auth"}> <p className="text-txtLight group-hover:text-txtDark">Sign Out</p></Link>
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
