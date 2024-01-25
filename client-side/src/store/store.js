import {configureStore} from '@reduxjs/toolkit'
import { authslice } from '../features/authSlice'
 export const store=configureStore({
   reducer:{
    auth:authslice
   }
});