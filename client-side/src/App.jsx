import { useEffect, useState } from 'react'
import './App.css'
import { Loader, Topbar } from './components/component'
import { Outlet } from 'react-router-dom'
import { authService } from './services/Auth.service'
import {useDispatch} from 'react-redux'
import {login} from './features/authSlice'

function App() {
 const [loading,setLoading]=useState(true);
 const dispatch=useDispatch();
useEffect(()=>{
    authService.vefifyLogin()
    .then((data)=>{
    dispatch(login(data.data));
    })
    .catch((error)=>{
      throw error
    })
    .finally(()=>{
      setLoading(false);
    })
},[])

  return !loading?(
   <div>
    <Topbar/>
   {<Outlet/>}
   </div>
  ):(
    <div className='h-screen w-full flex justify-center items-center' >
      <Loader height="4" width="4" />
    </div>
  )
}

export default App
