import React,{useEffect} from 'react'
import { Link} from 'react-router-dom'
import { useDispatch,useSelector } from 'react-redux';
import {MdEdit,MdDelete,MdOutlineAddBox} from 'react-icons/md'
import AOS from 'aos';
import 'aos/dist/aos.css';
import { fetchService } from '../redux/Services';
import axios from 'axios';

const PostTable = () => {

  
  useEffect(() => {
    AOS.init({
      duration: 1200,  // Duration of the animation (in milliseconds)
      offset: 100,     // Offset from the top when animation should trigger
      once: false,
      mirror: true      // Whether animation should happen only once
    });
  }, []);



const dispatch = useDispatch()
const services = useSelector(state=>state.services)

useEffect(()=>{
  dispatch(fetchService())
},[])


const handleDelete = (id)=>{
  const deletedPost = confirm('This will be deleted!!!')
  deletedPost && axios.delete(`https://infotechscholars.com/api/services/${id}`)
   window.location.reload()
}


  return (
    <div className='container'>
    <div className='d-flex justify-content-end'>
     
    <Link to='/create/service'>
                    <MdOutlineAddBox className='h1 mx-1'/>
                </Link>
    </div>
    {
      services.loading ? <h1>Loading data.............</h1> : services.data.length >0 ?
    
      <table className='table table-bordered table-hover table-responsive' data-aos='zoom-out'>
        <thead>
        <tr className='table-dark'>
            <th>Title</th>
            <th>Description</th>
            <th>Image</th>
            <th>Operation</th>
            </tr>
        </thead>
        <tbody>
         {
            services.data.map((item,i)=><tr key={item.id}>
                <td>{item.title}</td>
                <td>{item.description}</td>
                <td><img  src={`https://infotechscholars.com/${item.selectedFile}`} 
                 alt='title' width={30} height={30}/></td>
                <td>
              
                <Link to={`/update/service/${item.id}`}>
                <MdEdit className='h5 mx-1'/>
                </Link>
            <Link to='#'>
            <MdDelete className='h5 text-danger' onClick={()=>handleDelete(item.id)}/>
            </Link>
                
                </td>
            </tr>)
         }
        </tbody>
      </table>
       : <h1>You have no post yet Just add one or more if you want so👌👌</h1>
        }
    </div>
  )
}

export default PostTable
