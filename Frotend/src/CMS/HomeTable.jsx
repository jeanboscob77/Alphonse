import React,{useState,useEffect} from 'react'
import { Link } from 'react-router-dom';
import { useDispatch,useSelector } from 'react-redux';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { fetchBlogs } from '../redux/Blogs';
import { fetchApi } from '../redux/ApiSlice';
import {MdEdit,MdDelete,MdOutlineAddBox} from 'react-icons/md'
import axios from 'axios';



const HomeTable = () => {



  
  useEffect(() => {
    AOS.init({
      duration: 1200,  // Duration of the animation (in milliseconds)
      offset: 100,     // Offset from the top when animation should trigger
      once: false,
      mirror: true      // Whether animation should happen only once
    });
  }, []);



  const dispatch = useDispatch()
  const blogs = useSelector(state=>state.blogs)
  useEffect(()=>{
    dispatch(fetchBlogs())
  },[])



 
const handleDelete = (id)=>{
  const deletedPost = confirm('This will be deleted!!!')
  deletedPost && axios.delete(`https://infotechscholars.com/api/blogs/${id}`)
  window.location.reload()
}

    

  return (
    <div className='container'>
    <div className='d-flex justify-content-end'>
    <Link to='/create/blog'>
                    <MdOutlineAddBox className='h1 mx-1'/>
                </Link>
    </div>
   {
    blogs.loading ? <h1>Loading......</h1> : blogs.data.length > 0?
   
      <table className='table table-bordered table-hover table-responsive' data-aos='zoom-in'>
        <thead>
            <tr className='table-dark'>
                <th>Title</th>
                <th>description</th>
                <th>Image</th>
                <th>Date</th>
                <th>Operation</th>
            </tr>
        </thead>
        <tbody>
            {
                blogs.data.map((post,i)=><tr key={post.id}>
                    <td>{post.title}</td>
                    <td>{post.description}</td>
                    <td><img src={`https://infotechscholars.com/${post.selectedFile}`}
                     alt='title'
                     width={30} height={30}/></td>
                    <td>{post.created_at}</td>
                    <td className='d-flex'>
                  
                <Link to={`/update/blog/${post.id}`}>
                <MdEdit className='h5 mx-1'/>
                </Link>
               <Link to='#'>
               <MdDelete className='h5 text-danger' onClick={()=>handleDelete(post.id)}/>
               </Link>
              
                    </td>
                </tr>)
            }
        </tbody>
      </table>
     : <h1>Please add new Blog because you don't have<span className='text-danger'> any blog post for now</span></h1>
          }
    </div>
  )
}

export default HomeTable
