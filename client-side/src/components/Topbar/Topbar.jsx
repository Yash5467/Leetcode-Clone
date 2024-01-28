import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {Link, NavLink} from 'react-router-dom'
import { Button } from "../component";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faHamburger } from "@fortawesome/free-solid-svg-icons";
import { authService } from "../../services/Auth.service";
import { logout } from "../../features/authSlice";

function Topbar() {
  const [isNav,setIsNav]=useState(false);
  const [isDrop,setIsDrop]=useState(false);
  const {status,userData}=useSelector((state)=>state.auth);
  const dispatch=useDispatch();
  const navItems = [
    { tittle: "Problems", redirection: "problems" },
    { tittle: "Explore", redirection: "explore" },
    { tittle: "Contest", redirection: "contest" },
  ];
  const handleLogout=async()=>{
     await authService.logout();
     dispatch(logout());
     setIsDrop(false);

  }
  return (
 



<nav className="bg-white border-gray-200 dark:bg-dark-layer-1 dark:text-dark-gray-7 border-b dark:border-dark-divider-border-2">
  <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-1">
  <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse">
      <span className="self-center  font-semibold whitespace-nowrap dark:text-white">Codebite</span>
  </Link>
  <div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
    { status? <button  onClick={()=>setIsDrop((prev)=>!prev)} type="button" className="flex text-sm bg-gray-800 rounded-full md:me-0  " >
        <img className="w-8 h-8 rounded-full" src={userData.avatar} alt="user photo"/>
      </button> : <div className="flex" > <NavLink className="hover:text-white" to="/login" >
      <Button content="Login" />
        </NavLink> <NavLink className="hover:text-white" to="/signup" >
        <Button content="SignUp" />
          </NavLink> </div>}
      <div className={` z-50 ${!isDrop?"hidden":""}  absolute right-8 top-16 my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-dark-layer-1 dark:divide-gray-600`} id="user-dropdown">
        <div className="px-4 py-3">
          <span className="block text-sm text-gray-900 dark:text-white">{ status && userData.fullName}</span>
          <span className="block text-sm  text-gray-500 truncate dark:text-gray-400">{ status && userData.email}</span>
        </div>
        <ul className="py-2" >
        <li>
            <span  className="block px-4 py-2 text-sm text-gray-700 cursor-pointer hover:bg-gray-100 dark:hover:bg-dark-fill-3 dark:text-gray-200 dark:hover:text-white">Dashboard</span>
          </li>
          <li>
            <span href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Settings</span>
          </li>
          <li>
            <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Earnings</a>
          </li>
          <li>
            <span  onClick={handleLogout} className="block px-4 py-2 cursor-pointer text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Sign out</span>
          </li>
        </ul>
      </div>
      <button onClick={()=>setIsNav((prev)=>!prev)}  className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-user" aria-expanded="false">
       <FontAwesomeIcon icon={faBars} />
    </button>
  </div>
  <div className={`items-center ml-auto mr-4 justify-between ${!isNav?"hidden":""} w-full md:flex md:w-auto md:order-1  `}>
    <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-dark-layer-1 md:dark:bg-dark-layer-1 dark:border-gray-700">
     {navItems.map((item,index)=>(<li key={index} className="block py-2 px-3  rounded md:bg-transparent md:p-0 " >
        <NavLink className={({isActive})=>isActive?"text-brand-orange-s hover:text-white":"text-dark-gray-7 hover:text-white" } to={item.redirection}>{item.tittle}</NavLink>
      </li>))}
    </ul>
  </div>
  </div>
</nav>

  );
}

export default Topbar;
