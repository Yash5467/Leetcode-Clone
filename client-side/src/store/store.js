import {configureStore} from '@reduxjs/toolkit'
import { authslice } from '../features/authSlice'
import { progressslice } from '../features/progressSlice';
 export const store=configureStore({
   reducer:{
    auth:authslice,
    userProgress:progressslice
   }
});