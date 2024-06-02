import React, { Fragment, useState, useEffect } from 'react'
import { AnimatePresence } from 'framer-motion'
import { TemplateDesignPin } from '../component'
import noData from '../assets/nodata.png'
import axios from 'axios'
const dburl = process.env.REACT_APP_URL

const HomeContainer = () => {

  const [templates, setTemplates] = useState([]);

  const fetchTemp = async () => {
    let response = await axios.get(`${dburl}/gettemplate`);
    setTemplates(response.data)
  }
  useEffect(() => { fetchTemp() }, [])


  return (
    <div className='w-full px-4 lg:px-12 py-6 flex flex-col items-center justify-start'>

      <h1 className='mb-6 text-xl text-purple-800 border-b-2 border-purple-700'>Templates for you</h1>
      {/* render those templates - RESUME PIN */}
      <Fragment>
        <div className='w-full grid grid-cols-1 sm:w-fit sm:grid-cols-2 md:grid-cols-5 2xl:grid-cols-5 gap-6'>
          <AnimatePresence>
            <RenderATemplate templates={templates} />
          </AnimatePresence>
        </div>
      </Fragment>
    </div>
  )
}

const RenderATemplate = ({ templates }) => {
  return (
    <Fragment>
      {templates && templates.length > 0
        ? <Fragment>
          {templates && templates.map((template, index) => (
            <TemplateDesignPin key={template?.templateId} data={template} index={index} />
          ))}
        </Fragment>
        : <Fragment>
          <div className='flex flex-col items-center'>
            <img src={noData} alt='no data found' />
            <p >no data found</p>
          </div>
        </Fragment>
      }
    </Fragment>
  )
}
export default HomeContainer