import React, { Fragment } from 'react'
import Filters from '../component/Filters'
import { default as Template1 } from '../assets/Template1.jpg'
import { default as Template2 } from '../assets/Template2.jpg'
import { AnimatePresence } from 'framer-motion'
import { TemplateDesignPin } from '../component'

const HomeContainer = () => {
  const templates = [
    { id: 1, name: 'template1', img: Template1, index: 1, title: 'Professinal Resume for Front-end Developer', likes: 30 },
    { id: 2, name: 'template2', img: Template2, index: 2, title: 'Professinal Resume for Software Developer', likes: 15 },
  ]
  return (
    <div className='w-full px-4 lg:px-12 py-6 flex flex-col items-center justify-start'>

      {/* filter section */}
      <Filters />

      {/* render those templates - RESUME PIN */}
      <Fragment>
        <div className='w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 2xl:grid-cols-5 gap-4'>
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
            <TemplateDesignPin key={template?.id} data={template} index={index} />
          ))}
        </Fragment>
        : <Fragment>
          <p>no data found</p>
        </Fragment>
      }
    </Fragment>
  )
}
export default HomeContainer