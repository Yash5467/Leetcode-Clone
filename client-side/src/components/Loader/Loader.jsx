import React from 'react'

function Loader({height,width}) {
  return (
    <div className='flex gap-2' >
      <div className={`w-${width} h-${height} rounded-full animate-pulse dark:bg-blue-400`}></div>
	<div className={`w-${width} h-${height} rounded-full animate-pulse dark:bg-blue-400`}></div>
	<div className={`w-${width} h-${height} rounded-full animate-pulse dark:bg-blue-400`}></div>
    </div>
  )
}

export default Loader