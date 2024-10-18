import { configureStore } from "@reduxjs/toolkit";
import LoggedReducer from './isLogged'
import BlogReducerPost from './postData'
import FetchApi from './ApiSlice'
import BlogReducer from './Blogs'
import ServiceReducer from './Services'
const store = configureStore({
     reducer: {
        auth: LoggedReducer,
        postBlog:  BlogReducerPost,
        api: FetchApi,
        blogs: BlogReducer,
        services: ServiceReducer
     }
})

export default store