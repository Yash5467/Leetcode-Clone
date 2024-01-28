import { faAngleDown, faAngleUp, faArrowDown, faRefresh, faRightToBracket } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'

function EditorNav({defaultLanguage,setDefaultLanguage}) {
    const [isDrop,setIsDrop]=useState(false);
    const handleClick=(language)=>{
          setIsDrop(false);
          setDefaultLanguage(language);
    }

    const languageSelector=["Java","Python","C","C++"]
  return (
    <div className='flex items-center justify-between dark:bg-dark-layer-1 p-3  border-dark-divider-border-2 mb-2 border border-t-transparent rounded-sm h-11 w-full '>
    <div className=' flex flex-col  text-white'>
        <button onClick={()=>setIsDrop((prev)=>!prev)} className='flex cursor-pointer items-center rounded focus:outline-none bg-dark-fill-3 text-dark-label-2 hover:bg-dark-fill-2 text-md   px-2 py-1.5 font-medium'>
            <div className='flex items-center px-1'>
                <div className='text-md text-label-2 dark:text-dark-yellow'>{defaultLanguage}</div>
            </div>
            <div className='dark:text-dark-yellow' >
            <FontAwesomeIcon  icon={isDrop?faAngleDown:faAngleUp} />
            </div>
        </button>
        <div  className={`z-10 absolute ${!isDrop?"hidden":""} mt-10 bg-white divide-y divide-gray-100 rounded-lg shadow  w-20 dark:bg-dark-layer-1`} >
    <ul className="py-2 text-sm text-gray-700 dark:text-gray-200 ">
    {languageSelector.map((language,index)=>( language!==defaultLanguage?
         <li className="hover:bg-dark-fill-3" onClick={()=>handleClick(language)} key={index} >
         <span  className="block px-4 py-2">{language}</span>
       </li>:""
     ))}
    </ul>
</div>
    </div>
  

    <div className='flex items-center gap-4 m-2 mr-5'>
        <button
            className='preferenceBtn group'
           
        >
            <div className='h-4 w-4 text-dark-gray-6 font-bold text-lg'>
            <div className='dark:text-dark-yellow' ><FontAwesomeIcon icon={faRefresh} /></div>
            </div>
           
        </button>

        <button className='preferenceBtn group'>
            <div className='h-4 w-4 text-dark-gray-6 font-bold text-lg'>
                
            <div className='dark:text-dark-yellow'><FontAwesomeIcon icon={faRightToBracket} /></div>
            </div>
        </button>
    </div>
   
</div>
  )
}

export default EditorNav