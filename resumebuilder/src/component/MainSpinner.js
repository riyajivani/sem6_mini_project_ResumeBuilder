import React from 'react'
import { PropagateLoader } from 'react-spinners'

const MainSpinner = () => {
  return (
    <div className='w-full h-screen flex items-center justify-center'>
      <PropagateLoader color='#9b36d6' speedMultiplier={2} />
    </div>
  )
}

export default MainSpinner