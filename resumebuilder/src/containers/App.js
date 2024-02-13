import React, { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import {HomeScreen, Authentication} from '../pages'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>
    <Suspense fallback={<div>loading...</div>}>
      <Routes>
        <Route path='/*' element={<HomeScreen />} />
        <Route path='/auth' element={<Authentication/>} />
      </Routes>
      </Suspense>
      <ToastContainer position='top-right' theme='dark' autoClose={2000} icon={false} ty/>
    </>
  );
}

export default App;
