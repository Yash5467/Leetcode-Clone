import {createSlice} from '@reduxjs/toolkit'

 const initialState={
    userProgress:undefined
 }

export const progressSlice=createSlice({
     name:"UserProgess",
     initialState:initialState,
     reducers:{
        setUserProgess:(state,action)=>{
           state.userProgress=action.payload.userProgress
        },
        removeUserProgess:(state)=>{
            state.userProgress=undefined
        }
     }

});


export const {setUserProgess,removeUserProgess}=progressSlice.actions;
export const progressslice=progressSlice.reducer;
