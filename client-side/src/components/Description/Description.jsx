import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faThumbsDown, faThumbsUp} from '@fortawesome/free-solid-svg-icons'

function Editor({problemExamples,currentProblem,loading}) {
  
  return (
    <div className='bg-dark-layer-1 w-full  '>
    {/* TAB */}
    <div className='flex h-11  w-full items-center pt-2   bg-dark-layer-2 text-white overflow-hidden'>
        <div className={"bg-dark-layer-1 border dark:border-dark-divider-border-2  rounded-t-[5px] px-5 py-[10px] text-xs cursor-pointer font-semibold"}>
            Description
        </div>
    </div>

    <div className='flex px-0 py-4 h-[calc(100vh-94px)] border rounded-md dark:border-dark-divider-border-2  overflow-y-auto'>
        <div className='px-5'>
            {/* Problem heading */}
            <div className='w-full'>
                <div className='flex space-x-4'>
                    <div className='flex-1 mr-2 text-lg text-white font-medium'> {currentProblem.serialNumber}.{currentProblem?.tittle}</div>
                </div>
                {!loading && currentProblem && (
                    <div className='flex items-center mt-3'>
                        <div
                            className={` inline-block rounded-[21px] bg-opacity-[.15] px-2.5 py-1 text-xs font-medium capitalize ${currentProblem.difficulty==="Easy"?"text-dark-green-s":currentProblem.difficulty==="Medium"?"text-dark-yellow":"text-dark-pink"} `}
                        >
                            {currentProblem.difficulty} 
                        </div>
                        {
                            <div className='rounded p-[3px] ml-4 text-lg transition-colors duration-200 text-green-s text-dark-green-s'>
                            
                            </div>
                        }
                        <div
                            className='flex items-center cursor-pointer hover:bg-dark-fill-3 space-x-1 rounded p-[3px]  ml-4 text-lg transition-colors duration-200 text-dark-gray-6'
                           
                        > 
                        <FontAwesomeIcon icon={faThumbsUp} />

                            <span className='text-xs'>{currentProblem.likes}</span>
                        </div>
                        <div
                            className='flex items-center cursor-pointer hover:bg-dark-fill-3 space-x-1 rounded p-[3px]  ml-4 text-lg transition-colors duration-200 text-green-s text-dark-gray-6'
                            
                        >
                           <FontAwesomeIcon icon={faThumbsDown} />

                            <span className='text-xs'>{currentProblem.dislikes}</span>
                        </div>
                        <div
                            className='cursor-pointer hover:bg-dark-fill-3  rounded p-[3px]  ml-4 text-xl transition-colors duration-200 text-green-s text-dark-gray-6 '
                           
                        >
                           
                        </div>
                    </div>
                )}

            

                {/* Problem Statement(paragraphs) */}
                <div className='text-white text-sm mt-5'>
                    <div dangerouslySetInnerHTML={{ __html: currentProblem.description }} />
                </div>

                {/* Examples */}
                <div className='mt-6'>
                    {problemExamples.map((example, index) => (
                        <div key={example._id} className='mt-4'>
                            <p className='font-medium text-white '>Example {index + 1}: </p>
                            {example.img && <img src={example.img} alt='' className='mt-3' />}
                            <div className='mt-4 dark:text-dark-gray-7'>
                                <pre>
                                    <strong className='text-white'>Input: </strong> {example.input}
                                    <br />
                                    <strong className='dark:text-white' >Output:</strong>
                                    {example.output} <br />
                                    {example.explanation && (
                                        <>
                                            <strong>Explanation:</strong> {example.explanation}
                                        </>
                                    )}
                                </pre>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Constraints */}
                <div className='my-8 pb-4'>
                    <div className='text-white text-sm font-medium'>Constraints:</div>
                    <ul className='text-white ml-5 list-disc '>
                        {/* <div dangerouslySetInnerHTML={{ __html: problem.constraints }} /> */}
                    </ul>
                </div>
            </div>
        </div>
    </div>
</div>
  )
}

export default Editor