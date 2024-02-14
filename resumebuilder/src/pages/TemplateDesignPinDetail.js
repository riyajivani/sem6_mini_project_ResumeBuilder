import React, { Fragment } from 'react'
import { Link, useParams } from 'react-router-dom'
import { FaHouse } from 'react-icons/fa6'
import { BiSolidFolderPlus, BiSolidHeart } from 'react-icons/bi';
import { initialTags } from '../utils/helper'

const TemplateDesignPinDetail = () => {

  const data = JSON.parse(localStorage.getItem("ChosenTemplate"));

  return (
    <div className='w-full flex flex-col items-center justify-start px-4 py-12'>

      {/* bread crump */}
      <div className='w-full flex items-center pb-8 gap-2'>

        <Link to={"/"} className='flex items-center justify-center gap-2 text-txtPrimary'>
          <FaHouse />Home
        </Link>
        <p>/</p>
        <p>{data?.name}</p>
      </div>

      {/* design main section layout */}
      <div className='w-full grid grid-cols-1 lg:grid-cols-12'>
        {/* left section */}
        <div className='col-span-1 lg:col-span-8 flex flex-col items-start justify-start gap-4'>

          {/* load the template image */}

          <img className='w-full h-auto object-contain rounded-md' src={data?.img} alt='' />

          {/* title and other option */}

          <div className='w-full flex flex-col items-start justify-start gap-2'>

            {/* title section */}
            <div className='w-full flex items-center justify-between'>

              {/* title */}
              <p className='text-base text-txtPrimary font-semibold'>{data?.title}</p>

              {/* likes */}

              {
                data?.likes !== 0 && <div className='flex items-center justify-center gap-1'>
                  <BiSolidHeart className='text-base text-red-500' />
                  <p className='text-base text-txtPrimary font-semibold'>{data?.likes} Likes</p>
                </div>
              }
            </div>

            {/* collections favorite options */}

            <div className='flex items-center justify-center gap-3'>
              <Fragment>
                <div className='flex items-center justify-center px-4 py-2 rounded-md border border-gray-300 gap-2 hover:bg-gray-200 cursor-pointer'>
                  <BiSolidFolderPlus className='text-base text-txtPrimary' />
                  <p className='text-sm text-txtPrimary whitespace-nowrap'>Remove from collection</p>
                </div>
              </Fragment>

              <Fragment>
                <div className='flex items-center justify-center px-4 py-2 rounded-md border border-gray-300 gap-2 hover:bg-gray-200 cursor-pointer'>
                  <BiSolidHeart className='text-base text-txtPrimary' />
                  <p className='text-sm text-txtPrimary whitespace-nowrap'>Remove from favorites</p>
                </div>
              </Fragment>
            </div>

          </div>

        </div>

        {/* right section */}
        <div className='col-span-1 lg:col-span-4 w-full flex flex-col items-center justify-start px-3 py-2 lg:py-0 gap-6'>

          {/* discovere more */}
          <div className='w-full h-72 bg-blue-200 rounded-md overflow-hidden relative' style={{ background: "url(https://cdn.pixabay.com/photo/2018/05/04/15/23/poppies-3374193_1280.jpg)", backgroundPosition: "center", backgroundSize: "cover" }}>

            <div className='absolute inset-0 flex items-center justify-center bg-[rgba(0,0,0,0.4)]'>
              <Link to={"/"} className='px-4 py-2 rounded-md border-2 border-gray-50 text-white'>
                Discover More
              </Link>
            </div>

          </div>

          {/* edit the template */}


          <Link to='/userdetail' className='w-full px-4 py-3 rounded-md flex items-center justify-center bg-emerald-500 cursor-pointer'>
            <p className='text-white font-semibold text-lg'>Edit this template</p>
          </Link>

          <div className='w-full flex items-center justify-start flex-wrap gap-2'>
            {initialTags.map((tag, index) => (
              <p key={index} className='text-ss border border-gray-300 px-2 py-1 rounded-md whitespace-nowrap'>{tag}</p>
            ))}
          </div>

        </div>
      </div>


    </div >
  )
}

export default TemplateDesignPinDetail