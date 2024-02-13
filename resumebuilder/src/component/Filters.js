import { React, useEffect, useState } from 'react'
import { MdLayersClear } from "react-icons/md"
import { AnimatePresence, motion } from 'framer-motion'
import { SlideUpDownWithScale } from '../animations/index'
import { FilteredData } from '../utils/helper'
import { toast } from 'react-toastify'

const Filters = () => {

     const [isClearedHovered, setIsClearedHovered] = useState(false)
     const [filteredData, setFilteredData] = useState('');

     const handleFilterValue = (value) => {
          toast(`${value} selected`)
          setFilteredData(value);
     }

     const clearFilter = () => { setFilteredData(''); }

     useEffect(() => { localStorage.setItem("searchTerm", filteredData) }, [filteredData])

     return (
          <div className='w-full flex items-center justify-start py-4'>
               <div onClick={clearFilter} onMouseEnter={() => { setIsClearedHovered(true) }} onMouseLeave={() => { setIsClearedHovered(false) }} className='border border-gray-300 rounded-md px-3 py-2 mr-2 cursor-pointer group hover:shadow-md bg-gray-100 relative'>
                    <MdLayersClear className='text-xl' />

                    {/* animation tooltip for  clearbutton */}
                    <AnimatePresence>
                         {isClearedHovered &&
                              (<motion.div {...SlideUpDownWithScale} className='absolute -top-8 -left-2 bg-white shadow-md rounded-md px-2 py-1'>
                                   <p className='whitespace-nowrap text-xs'>Clear all</p>
                              </motion.div>
                              )}
                    </AnimatePresence>
               </div>

               <div className='w-full flex items-center justify-start overflow-x-scroll gap-6 scrollbar-none'>
                    {FilteredData && FilteredData.map((item) => (
                         <div key={item.id} onClick={() => { handleFilterValue(item.value) }} className={`border border-gray-300 rounded-md px-6 py-2 cursor-pointer group hover:shadow-md ${filteredData === item.value && "bg-gray-300 shadow-md"}`}>
                              <p className='text-sm text-txtPrimary group-hover:text-txtDark whitespace-nowrap'>{item.label}</p>
                         </div>
                    ))}
               </div>
          </div>
     )
}

export default Filters