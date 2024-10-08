import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const PostHome = () => {

const navigate = useNavigate()
const [selectedFile, setSelectedFile] = useState(null);
const [title,setTitle] = useState('')
const [description,setDescription] = useState('')

//hangle file onchange
const handleFileChange = (event) => {
    // Access the file from event.target.files
    const file = event.target.files[0];
    setSelectedFile(file);
  };


  //handle submit 
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/api/blogs', {title,description,selectedFile}, {
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
        <form className='w-50 mx-auto'  onSubmit={handleSubmit}>
            <div className='my-3'>
            <label htmlFor='title' className='form-label'>Title:</label>
                <input type='text' className='form-control' placeholder='Enter book title'
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
            <button className='btn btn-primary' type='submit'>Save</button>
            </div>
           
            </div>
          
        </form>
    </div>
  )
}

export default PostHome