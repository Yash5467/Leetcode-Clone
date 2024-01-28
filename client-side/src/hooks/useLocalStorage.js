
import React, { useEffect, useState } from 'react'

function useLocalStorage({key,intialValue}) {
       const [item,setItem]=useState(()=>{
           try {
            const data= localStorage.getItem(key);
            const value=data?JSON.parse(data):undefined;
            return value?value:intialValue
           } catch (error) {
             throw error
           }
       });
       useEffect(()=>{
         localStorage.setItem(key,JSON.stringify(item));
       },[key,item])

       return [item,setItem];
}

export default useLocalStorage