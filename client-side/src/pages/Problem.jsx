import React, { useEffect } from 'react'
import { Progress, Topbar } from '../components/component'
import ProblemList from '../components/ProblemList/ProblemList'
import { useSelector } from 'react-redux'

function Problem() {
 const {status}=useSelector((state)=>state.auth)
  return (
 <div className='flex gap-10   flex-wrap' >
  <div className='w-[60%] sm:ml-52 max-sm:w-full' >
    <ProblemList/>
  </div>
  <div className=' mt-16 '>
   {status &&  <div className='' >
    <Progress/>
    </div>}
  </div>
 </div>
  )
}

export default Problem