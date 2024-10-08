import React,{useState,useEffect} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {MdEdit,MdDelete,MdOutlineAddBox} from 'react-icons/md'
import AOS from 'aos';
import 'aos/dist/aos.css';
import axios from 'axios'

const PostTable = () => {


  const navigate = useNavigate()
  
  useEffect(() => {
    AOS.init({
      duration: 1200,  // Duration of the animation (in milliseconds)
      offset: 100,     // Offset from the top when animation should trigger
      once: false,
      mirror: true      // Whether animation should happen only once
    });
  }, []);



const [services,setServices] = useState([])


useEffect(()=>{
axios.get('http://localhost:5000/api/services').then((res)=>{
  if(res.data){
    setServices(res.data)
  }
  
})
.then((error)=>{
console.log(error);

})

},[])


const handleDelete = (id)=>{
  const deletedPost = confirm('This will be deleted!!!')
  deletedPost && axios.delete(`http://localhost:5000/api/services/${id}`).then((res)=>{
    if(res.data){ 
        setServices(services.filter(item=>item._id !== id))
    }
   
   
  }).catch((error)=>{
    console.log(error);
    
  })
}


  return (
    <div className='container'>
    <div className='d-flex justify-content-end'>
     
    <Link to='/create/service'>
                    <MdOutlineAddBox className='h1 mx-1'/>
                </Link>
    </div>
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
            services.map((item,i)=><tr key={item._id}>
                <td>{item.title}</td>
                <td>{item.description}</td>
                <td><img  src={`http://localhost:5000/${item.selectedFile.replace(/\\/g,'/')}`} 
                 alt='title' width={30} height={30}/></td>
                <td>
              
                <Link to={`/update/service/${item._id}`}>
                <MdEdit className='h5 mx-1'/>
                </Link>
            <Link to='#'>
            <MdDelete className='h5 text-danger' onClick={()=>handleDelete(item._id)}/>
            </Link>
                
                </td>
            </tr>)
         }
        </tbody>
      </table>
    </div>
  )
}

export default PostTable
