import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch} from 'react-redux';
import { postData } from '../../redux/postData';

const PostHome = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [selectedFile, setSelectedFile] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');


  // Handle file change
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  // Handle submit
  const handleSubmit =  (e) => {
    e.preventDefault();

    // Create FormData object to handle file uploads
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('selectedFile', selectedFile);  // Ensure file is appended properly

    // Dispatch the action to post data
 
      const result = dispatch(postData(formData));
      if(result){
        navigate('/admin/dashboard');
      }
       
    
  };

  return (
    <div className='pt-5 mt-5'>
      <form className='w-50 mx-auto' onSubmit={handleSubmit}>
        <div className='my-3'>
          <label htmlFor='title' className='form-label'>Title:</label>
          <input
            type='text'
            className='form-control'
            placeholder='Enter post title'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div className='mb-3'>
          <label htmlFor='description' className='form-label'>Description:</label>
          <textarea
            type='text'
            className='form-control'
            placeholder='Enter description of your post...'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>

        <div className='mb-3'>
          <label htmlFor='file' className='form-label'>File:</label>
          <input
            type='file'
            onChange={handleFileChange}
            className='form-control'
            required
          />
        </div>

        <div className='w-100 d-flex justify-content-center'>
          <button className='btn btn-primary' type='submit'>
            Save
          </button>
        </div>

      </form>
    </div>
  );
};

export default PostHome;
