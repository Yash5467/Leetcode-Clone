import React, { useEffect, useState } from "react";
import { progressService } from "../../services/Progress.service";
import {useDispatch, useSelector} from 'react-redux'
import {setUserProgess} from '../../features/progressSlice.js'
import Skeleten from "../skeleten/Skeleten.jsx";

function Progress() {
  const dispatch=useDispatch();
  const userProgress=useSelector((state)=>state.userProgress.userProgress);
  const [loader,setLoader]=useState(true);
  useEffect(()=>{
    progressService.getProgress().then((data)=>dispatch(setUserProgess({userProgress:data.data.data}))).then(()=>setLoader(false));
  },[])
  return !loader?(
    <div className="bg-layer-1 dark:bg-dark-layer-1 shadow-down-01 dark:shadow-dark-down-01 rounded-lg py-2">
      <div className="flex h-9 items-center justify-between px-4 lg:pr-4">
        <div className="min-w-[59px] flex-shrink truncate text-sm font-medium  dark:text-dark-gray-8 ">
        Progress
        </div>
       
      </div>
      <div className="pl-4 pr-4 ">
        <div className="flex items-center gap-4 justify-between">
          <div className="shrink-1 z-base relative max-h-[100px] max-w-[100px] ">
           <div className="h-[50px] w-[50px] rounded-[50%] border p-10 " >

           </div>
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform cursor-default">
              <div data-difficulty="TOTAL" className="truncate text-center">
                <div className="mb-[1px] text-[11px]">
                  <span className="text-label-3 dark:text-dark-label-2">All</span>
                </div>
                <div className="text-dark-paper dark:text-white pb-0.5 text-xl font-medium leading-none lg:text-2xl lg:leading-none">
                   {userProgress.medium+userProgress.easy+userProgress.hard}
                </div>
                <hr className="border-divider-2 dark:border-dark-divider-2 mx-auto max-w-[32px]" />
                <div className="text-label-4 dark:text-dark-label-2 pt-0.5 text-xs font-semibold">
                  3018
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-auto flex-col min-w-max space-y-2.5 max-w-[128px]">
            <div
              data-difficulty="EASY"
              className="flex items-center justify-between text-center truncate cursor-pointer"
            >
              <div className="text-sm leading-tight grow text-left">
                <span className="text-olive dark:text-dark-olive">Easy</span>
              </div>
              <div className="text-label-2 dark:text-white font-semibold leading-none px-[3px] text-sm">
                {userProgress.easy}
              </div>
              <div className="text-label-4 dark:text-dark-label-2 text-xs leading-none font-semibold pr-1">
                /763
              </div>
            </div>
            <div
              data-difficulty="MEDIUM"
              className="flex items-center justify-between text-center truncate cursor-pointer"
            >
              <div className="text-sm leading-tight grow text-left">
                <span className="text-yellow dark:text-dark-yellow">Medium</span>
              </div>
              <div className="text-label-2 dark:text-white font-semibold leading-none px-[3px] text-sm">
                {userProgress.medium}
              </div>
              <div className="text-label-4 dark:text-dark-label-2 text-xs leading-none font-semibold pr-1 tracking-tightest">
                /1587
              </div>
            </div>
            <div
              data-difficulty="HARD"
              className="flex items-center justify-between text-center truncate cursor-pointer"
            >
              <div className="text-sm leading-tight grow text-left">
                <span className="text-pink dark:text-dark-pink">Hard</span>
              </div>
              <div className="text-label-2 dark:text-white font-semibold leading-none px-[3px] text-sm">
               {userProgress.hard}
              </div>
              <div className="text-label-4   dark:text-dark-label-2 text-xs leading-none font-semibold pr-1">
                /668
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  ):(
 
      <Skeleten  height="133px" width="228px" radius="xl" />
  )
}

export default Progress;
