import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchBlogs = createAsyncThunk('fetch/blogs' ,async()=>{
    const services = await axios.get('http://localhost:5000/api/blogs')
    const mydata =  services.data
    return mydata
})

const BlogReducer = createSlice({
    name: 'blogs',
    initialState: {
        loading: false,
        data : [],
        error: false
    },

 extraReducers: (builder)=>{
   builder.addCase(fetchBlogs.pending,(state)=>{
    state.loading = true
   }),

   builder.addCase(fetchBlogs.fulfilled,(state,action)=>{
    state.loading = false
    state.data = action.payload
   }),
   builder.addCase(fetchBlogs.rejected,(state,action)=>{
   state.error = action.payload
   state.loading = false
   })
 }
})


export default BlogReducer.reducer