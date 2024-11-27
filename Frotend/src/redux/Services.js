import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchService = createAsyncThunk('fetchService' ,async()=>{
    const services = await axios.get('https://infotechscholars.com/api/services')
    const mydata =  services.data
    return mydata
})

const ServiceReducer = createSlice({
    name: 'services',
    initialState: {
        loading: false,
        data : [],
        error: false
    },

 extraReducers: (builder)=>{
   builder.addCase(fetchService.pending,(state)=>{
    state.loading = true
   }),

   builder.addCase(fetchService.fulfilled,(state,action)=>{
    state.loading = false
    state.data = action.payload
   }),
   builder.addCase(fetchService.rejected,(state,action)=>{
   state.error = action.payload
   state.loading = false
   })
 }
})


export default ServiceReducer.reducer