import axios from 'axios'
import React, { useState,useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const UpdateHome = () => {
const {id} = useParams()
const navigate = useNavigate()

const [selectedFile, setSelectedFile] = useState(null);


//hangle file onchange
const handleFileChange = (event) => {
  // Access the file from event.target.files
  const file = event.target.files[0];
  setSelectedFile(file);
};

const [title,setTitle] = useState('')
const [description,setDescription] = useState('')




useEffect(()=>{
    axios.get(`http://localhost:5000/api/blogs/${id}`).then((res)=>{
        
        setTitle(res.data.title)
        setDescription(res.data.description)
        setSelectedFile(res.data.selectedFile)
    }).catch((error)=>{
      console.log(error);
      
    })
   },[])



   
  //handle update
  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(`http://localhost:5000/api/blogs/${id}`, {title,description,selectedFile}, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('Service created successfully:', response.data);
      navigate('/admin/dashboard')
    } catch (error) {
      console.error('There was an error uploading the file!', error);
    }
  };


  return (
    <div className='pt-5 mt-5'>
    <div className='mt-3 mx-5'>
    <button className='btn btn-success' onClick={()=>navigate('/cms')}>👈</button>
    </div>
        <form className='w-50 mx-auto'>
            <div className='my-3'>
            <label htmlFor='title' className='form-label'>Title:</label>
                <input type='text' className='form-control' placeholder='Enter post title...'
                    value={title} onChange={(e)=>setTitle(e.target.value)}
                />
            </div>
            <div className='mb-3'>
            <label htmlFor='description' className='form-label'>Description:</label>
                <textarea type='text' className='form-control' placeholder='Enter description of your post...'
                    value={description} onChange={(e)=>setDescription(e.target.value)}
                />
            </div>
            <div className='mb-3'>
            <label htmlFor='file' className='form-label'>File:</label>
            <input type="file" onChange={handleFileChange} className='form-control'/>

            </div>
            <div className='w-100 d-flex justify-content-center'>
            <div className='mx-auto'>
            <button className='btn btn-primary' onClick={handleUpdate}>Update</button>
            </div>
           
            </div>
          
        </form>
    </div>
  )
}

export default UpdateHome