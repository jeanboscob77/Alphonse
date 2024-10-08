import React,{useState,useEffect} from 'react'
import { Link } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import axios from 'axios';
import {MdEdit,MdDelete,MdOutlineAddBox} from 'react-icons/md'


const HomeTable = () => {



  
  useEffect(() => {
    AOS.init({
      duration: 1200,  // Duration of the animation (in milliseconds)
      offset: 100,     // Offset from the top when animation should trigger
      once: false,
      mirror: true      // Whether animation should happen only once
    });
  }, []);



  const [blogs,setBlogs] = useState([])


  useEffect(()=>{
  axios.get('http://localhost:5000/api/blogs').then((res)=>{
    if(res.data){
      setBlogs(res.data)
    }
    
  })
  .then((error)=>{
  console.log(error);
  
  })
  
  },[])



 
const handleDelete = (id)=>{
  const deletedPost = confirm('This will be deleted!!!')
  deletedPost && axios.delete(`http://localhost:5000/api/blogs/${id}`).then((res)=>{
    if(res.data){ 
        setBlogs(blogs.filter(item=>item._id !== id))
    }
   
   
  }).catch((error)=>{
    console.log(error);
    
  })
}

    

  return (
    <div className='container'>
    <div className='d-flex justify-content-end'>
    <Link to='/create/blog'>
                    <MdOutlineAddBox className='h1 mx-1'/>
                </Link>
    </div>
   
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
                blogs.map((post,i)=><tr key={post._id}>
                    <td>{post.title}</td>
                    <td>{post.description}</td>
                    <td><img src={`http://localhost:5000/${post.selectedFile.replace(/\\/g,'/')}`}
                     alt='title'
                     width={30} height={30}/></td>
                    <td>{post.date}</td>
                    <td className='d-flex'>
                  
                <Link to={`/update/blog/${post._id}`}>
                <MdEdit className='h5 mx-1'/>
                </Link>
               <Link to='#'>
               <MdDelete className='h5 text-danger' onClick={()=>handleDelete(post._id)}/>
               </Link>
              
                    </td>
                </tr>)
            }
        </tbody>
      </table>
    </div>
  )
}

export default HomeTable
