import React, { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import { HomeScreen, Authentication } from '../pages'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import UserDetailForm from '../component/userDetailForm';
import WorkExperience from '../component/WorkExperience';
import EducationDetail from '../component/EducationDetail';
import Skills from '../component/Skills';

function App() {
  return (
    <>
      <Suspense fallback={<div>loading...</div>}>
        <Routes>
          <Route path='/home/*' element={<HomeScreen />} />
          <Route path='/' element={<Authentication />} />
          <Route path='/userdetail' element={<UserDetailForm />} />
          <Route path='/experience' element={<WorkExperience />} />
          <Route path='/education' element={<EducationDetail />} />
          <Route path='/skills' element={<Skills />} />
        </Routes>
      </Suspense>

      <ToastContainer position='top-right' theme='dark' autoClose={2000} icon={false} ty />
    </>
  );
}

export default App;
