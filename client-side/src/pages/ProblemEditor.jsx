import React, { useEffect, useState } from 'react'
import { Description, Editor } from '../components/component'
import Split  from 'react-split'
import { useParams } from 'react-router-dom';
import axios from 'axios';

function ProblemEditor() {
  const {problemId}=useParams();
  const [currentProblem,setCurrentProblem]=useState({});
  const [loading,setLoading]=useState(true);
  const [problemExamples,setProblemExamples]=useState([]);
  useEffect(()=>{
    setLoading(true);
    
        axios.get(import.meta.env.VITE_SERVER_ENDPOINT+"/problem/"+problemId).then((data)=>setCurrentProblem(data.data.data)).catch((err)=>{throw err})
        axios.post(import.meta.env.VITE_SERVER_ENDPOINT+"/problem/test-cases",{problemId:problemId}).then((data)=>setProblemExamples(data.data.data)).catch((err)=>{ throw err}).catch(()=>setLoading(false));
    
  },[problemId]);
  return (
    <div className='flex  ' >
       <Split className='flex' direction='horizontal'  sizes={[40, 60]} minSize={40} >
       <div>
       <Description currentProblem={currentProblem} loading={loading} problemExamples={problemExamples} />
       </div>
       <div>
      <Editor initialCode={"hello world"} problemId={problemId} problemExamples={problemExamples} loading={loading} />
       </div>
       </Split>
    </div>
  )
}

export default ProblemEditor