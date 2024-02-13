import React, { useState } from 'react'
import { motion, easeInOut, delay, AnimatePresence } from 'framer-motion'
import { FadeInOutWithOpacity, HideAndShow, scaleInOut } from '../animations'
import { BiFolderPlus, BiHeart } from 'react-icons/bi'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const TemplateDesignPin = ({ data, index }) => {

     const [ishoverred, setIshoverred] = useState(false)
     const navigate = useNavigate()

     const addToCollection = async (e) => {
          e.stopPropagation();
          toast("added to collection")
     }

     const addToFavorites = async (e) => {
          e.stopPropagation();
          toast("added to favorite")
     }

     const handleRouteNavigation = () => {
          localStorage.setItem("ChosenTemplate", JSON.stringify(data));
          navigate(`/resumeDetail/:${data?.id}`, { replace: true })
     }

     return <motion.div key={data?.id} {...scaleInOut(index)}>

          <div className='w-full h-[300px] 2xl:h-[640px] rounded-md bg-gray-200 overflow-hidden relative' onMouseEnter={() => { setIshoverred(true) }} onMouseLeave={() => { setIshoverred(false) }}>

               <img src={data?.img} className='w-full h-full object-fill' alt="" />

               <AnimatePresence>
                    {ishoverred &&
                         <motion.div {...FadeInOutWithOpacity}
                              onClick={handleRouteNavigation} className='absolute inset-0 bg-[rgba(0,0,0,0.4)] flex flex-col items-center justify-start px-4 py-3 z-50 cursor-pointer'>

                              <div className='flex flex-col items-end justify-start w-full gap-8'>
                                   <InnerBoxCard label={"Add to Collection"} Icon={BiFolderPlus} onHandle={addToCollection} />
                                   <InnerBoxCard label={"Add to Favorites"} Icon={BiHeart} onHandle={addToFavorites} />
                              </div>
                         </motion.div>
                    }
               </AnimatePresence>

          </div>
     </motion.div>
}

const InnerBoxCard = ({ label, Icon, onHandle }) => {

     const [isHoverred, setIsHoverred] = useState(false)

     return (
          <div onClick={onHandle} onMouseEnter={() => { setIsHoverred(true) }} onMouseLeave={() => { setIsHoverred(false) }} className='w-10 h-10 rounded-md bg-gray-200 flex items-center justify-center hover:shadow-md relative'>
               <Icon className='text-txtPrimary text-base' />
               <AnimatePresence>
                    {isHoverred &&
                         <motion.div  {...HideAndShow} className='px-3 py-2 rounded-md bg-gray-200 absolute -left-40 after:w-2 after:h-2 after:bg-gray-200 after:absolute after:-right-1 after:top-[14px] after:rotate-45'>
                              <p className='text-sm text-txtPrimary whitespace-nowrap'>{label}</p>
                         </motion.div>}
               </AnimatePresence>
          </div>
     )
};

export default TemplateDesignPin