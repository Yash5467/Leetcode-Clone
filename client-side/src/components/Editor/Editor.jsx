import React, { useState } from 'react'
import {Editor as MonacoEditor} from '@monaco-editor/react'
import Split from 'react-split'
import EditorNav from './EditorNav/EditorNav'
import useLocalStorage from '../../hooks/useLocalStorage'

function Editor({problemExamples,loading,initialCode,problemId}) {
    const [defaultLanguage,setDefaultLanguage]=useLocalStorage({key:"defaultLanguage",intialValue:"CPP"});
	const [problemCode,setProblemCode]=useLocalStorage({key:problemId,initialValue:initialCode});
	const [testCasesOutput,setTestCasesOutput]=useState([]);
	const [isTestCase,setIsTestCase]=useState(false);
	const [testCaseId,setTestCaseId]=useState(0);
	const [activeTestCaseId,setActiveTestCaseId]=useState(0);
  return (
    <div className='flex flex-col dark:bg-[#1e1e1e] relative overflow-x-hidden'>
			 <EditorNav defaultLanguage={defaultLanguage} setDefaultLanguage={setDefaultLanguage} />

			<Split className='h-[calc(100vh-94px)] ' direction='vertical' sizes={[60, 40]} minSize={60}>
				<div className='w-full overflow-auto'>
					<MonacoEditor
						defaultValue={problemCode}
						onChange={(value)=>setProblemCode(value)}
						height={"100vh"}
                        width={"auto"}
						 theme={"vs-dark"}
                         language='java'
                         options={{
                            minimap: {
                                enabled:false
                            }
                         }}
					/>
				</div>
				<div className='w-full px-5 overflow-auto bg-dark-layer-1 border rounded-sm dark:border-dark-divider-border-2'>
					{/* testcase heading */}
				<div className='flex gap-8' >
				<div onClick={()=>setIsTestCase(false)} className='flex h-10  items-center space-x-6'>
						<div className='relative flex h-full flex-col justify-center cursor-pointer'>
							<div className={`text-sm font-medium leading-5 ${!isTestCase?"dark:text-dark-green-s":"dark:text-dark-gray-8"}`}>Testcases</div>
							<hr className='absolute bottom-0 h-0.5 w-full rounded-full border-none bg-white' />
						</div>
					</div>
					<div onClick={()=>setIsTestCase(true)} className='flex h-10 items-center space-x-6'>
						<div className='relative flex h-full flex-col justify-center cursor-pointer'>
							<div className={`text-sm font-medium ${isTestCase?"dark:text-dark-green-s":"dark:text-dark-gray-8"} leading-5 text-white`}>Result</div>
							<hr className='absolute bottom-0 h-0.5 w-full rounded-full border-none bg-white' />
						</div>
					</div>
				</div>
					<div className='flex'>
						{ !loading && isTestCase?testCasesOutput:problemExamples.map((example, index) => (
							<div
								className='mr-2 items-start mt-2 '
								key={example._id}
								onClick={() => setActiveTestCaseId(index)}
							>
								<div className='flex flex-wrap items-center gap-y-4'>
									<div
										className={`font-medium items-center transition-all focus:outline-none inline-flex bg-dark-fill-3 hover:bg-dark-fill-2 dark:text-dark-gray-8 relative rounded-lg px-4 py-1 cursor-pointer whitespace-nowrap
										${index===activeTestCaseId?"dark:text-dark-yellow ":""}
									`}
									>
										Case {index + 1}
									</div>
								</div>
							</div>
						))}
					</div>

					<div className='font-semibold my-4 '>
						<p className='text-sm font-medium mt-4 text-white'>Input:</p>
						<div className='w-full cursor-text rounded-lg border px-3 py-[10px] bg-dark-fill-3 border-transparent text-white mt-2'>
							{!loading &&  isTestCase?testCasesOutput:problemExamples[isTestCase?testCaseId:activeTestCaseId]?.input}
						</div>
						<p className='text-sm font-medium mt-4 text-white'>Output:</p>
						<div className='w-full cursor-text rounded-lg border px-3 py-[10px] bg-dark-fill-3 border-transparent text-white mt-2'>
							{ !loading && isTestCase?testCasesOutput:problemExamples[isTestCase?testCaseId:activeTestCaseId]?.output}
						</div>
					</div>
				</div>
			</Split>
			{/* <EditorFooter handleSubmit={handleSubmit} /> */}
		</div>
  )
}

export default Editor