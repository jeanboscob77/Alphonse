import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchApi = createAsyncThunk('fetchApi' ,async(data)=>{
    const services = await axios.get(data)
    const mydata =  services.data
    return mydata
})

const APiReducer = createSlice({
    name: 'services',
    initialState: {
        loading: false,
        data : [],
        error: false
    },

 extraReducers: (builder)=>{
   builder.addCase(fetchApi.pending,(state)=>{
    state.loading = true
   }),

   builder.addCase(fetchApi.fulfilled,(state,action)=>{
    state.loading = false
    state.data = action.payload
   }),
   builder.addCase(fetchApi.rejected,(state,action)=>{
   state.error = action.payload
   state.loading = false
   })
 }
})


export default APiReducer.reducer