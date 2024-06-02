import React, { Suspense } from 'react'
import { Header, MainSpinner } from '../component'
import { Route, Routes } from 'react-router-dom'
import {HomeContainer} from '../containers'
import {CreateResume, CreateTemplates, TemplateDesignPinDetail, UserProfile} from '../pages'
// const dburl = process.env.REACT_APP_URL

const HomeScreen = () => {
  return (
    <div className='w-full flex flex-col items-center justify-center'>
      
      {/* header */}
      <Header />

      <main className='w-full'>
        <Suspense fallback={<MainSpinner/>}>
          <Routes>
            <Route path='/' element={<HomeContainer />} />
            <Route path='/template/create' element={<CreateTemplates />} />
            <Route path='/profile/:uid' element={<UserProfile />} />
            <Route path='/resume/*' element={<CreateResume />} />
            <Route path='/resumeDetail/:templateID' element={<TemplateDesignPinDetail />} />
          </Routes>
        </Suspense>
      </main>
    </div>
  )
}

export default HomeScreen