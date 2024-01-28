import React, { useState } from 'react'
import { authService } from '../../services/Auth.service';
import { useDispatch } from 'react-redux';
import {login} from '../../features/authSlice.js'
import { Link, NavLink, useNavigate } from 'react-router-dom';

function Login() {
    const  [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const [loading,setLoading]=useState(false);
	const dispatch=useDispatch();
	const navigate=useNavigate();
    const handleLogin=async(e)=>{
           e.preventDefault();
           setLoading(true);
   try {
    const userData=  await authService.login({email,password});
	dispatch(login({userData:userData.data}));
     navigate("/");
   } catch (error) {
      throw error
   }finally{
    setLoading(false);
   }
    
    };
    const handleClick=()=>{}
  return (
    <div className=" w-full mx-auto ">
        <div className="max-w-sm mx-auto mt-14">
        <form className='space-y-6 px-6 pb-4' onSubmit={handleLogin}>
			<h3 className='text-xl font-medium text-white'>Sign in to LeetClone</h3>
			<div>
				<label htmlFor='email' className='text-sm font-medium block mb-2 text-gray-300'>
					Your Email
				</label>
				<input
					onChange={(e)=>setEmail(e.target.value)}
					type='email'
					name='email'
					id='email'
					className='
            border-2 outline-none sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5
            bg-gray-600 border-gray-500 placeholder-gray-400 text-white
        '
					placeholder='name@company.com'
				/>
			</div>
			<div>
				<label htmlFor='password' className='text-sm font-medium block mb-2 text-gray-300'>
					Your Password
				</label>
				<input
					onChange={(e)=>setPassword(e.target.value)}
					type='password'
					name='password'
					id='password'
					className='
            border-2 outline-none sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5
            bg-gray-600 border-gray-500 placeholder-gray-400 text-white
        '
					placeholder='*******'
				/>
			</div>

			<button
				type='submit'
				className='w-full text-white focus:ring-blue-300 font-medium rounded-lg
                text-sm px-5 py-2.5 text-center bg-brand-orange hover:bg-brand-orange-s
            '
			>
				{loading ? "Loading..." : "Log In"}
			</button>
			<button className='flex w-full justify-end' >
				<Link to="/forget-password" className='text-sm block text-brand-orange hover:underline w-full text-right'>
					Forgot Password?
				</Link>
			</button>
			<div className='text-sm font-medium text-gray-300'>
				Not Registered?{" "}
				<Link to="/signup" className='text-blue-700 hover:underline'>
					Create account
				</Link>
			</div>
		</form>
        </div>
    </div>
  )
}

export default Login