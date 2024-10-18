import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// Create async thunk for the POST request
export const postData = createAsyncThunk('postData', async (data, { rejectWithValue }) => {
    try {
        const response = await axios.post('http://localhost:5000/api/blogs', data);
        return response.data;  // No need to await response.data
    } catch (error) {
        // Return a rejected value to be handled in the reducer
        return rejectWithValue(error.response?.data || error.message);
    }
});

const postBlog = createSlice({
    name: 'posts',
    initialState: {
        loading: false,
        data: null,
        error: null,  // Error can store a message or object, initialized as null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(postData.pending, (state) => {
            state.loading = true;
            state.error = null;
        });

        builder.addCase(postData.fulfilled, (state, action) => {
            state.loading = false;
            state.data = action.payload;
        });

        builder.addCase(postData.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;  // Store error message from rejected action
        });
    }
});

export default postBlog.reducer;
