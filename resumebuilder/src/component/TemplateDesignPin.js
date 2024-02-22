import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FadeInOutWithOpacity, scaleInOut } from '../animations'
// import { BiFolderPlus, BiHeart } from 'react-icons/bi'
// import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const TemplateDesignPin = ({ data, index }) => {

     const [ishoverred, setIshoverred] = useState(false)
     const navigate = useNavigate()

     const handleRouteNavigation = () => {
          localStorage.setItem("ChosenTemplate", JSON.stringify(data));
          navigate(`/resumeDetail/:${data?.templateId}`, { replace: true })
     }

     return <motion.div key={data?.id} {...scaleInOut(index)}>

          <div className='w-full h-[300px] 2xl:h-[640px] rounded-md bg-gray-200 overflow-hidden relative' onMouseEnter={() => { setIshoverred(true) }} onMouseLeave={() => { setIshoverred(false) }}>

               <img src={data?.url} className='w-full h-full object-fill' alt="" />

               <AnimatePresence>
                    {ishoverred &&
                         <motion.div {...FadeInOutWithOpacity}
                              onClick={handleRouteNavigation} className='absolute inset-0 bg-[rgba(0,0,0,0.4)] flex flex-col items-center justify-start px-4 py-3 z-50 cursor-pointer'>
                         </motion.div>
                    }
               </AnimatePresence>

          </div>
     </motion.div>
}

export default TemplateDesignPin