import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch} from 'react-redux';
import { postData } from '../../redux/postData';


       
    



const PostHome = () => {



  const navigate = useNavigate();
  const dispatch = useDispatch();


  const [formData, setFormData] = useState({
    title: '',
    description: '',
    moreInfo: [
      { title: '', notes: '' },
      { title: '', notes: '' },
      { title: '', notes: '' },
      { title: '', notes: '' },
      { title: '', notes: '' }
    ]
  });

  const [selectedFile, setSelectedFile] = useState(null);

  // Handle changes for input fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle file input changes
  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  // Handle changes for subservice fields
  const handleSubServiceChange = (index, field, value) => {
    const updatedSubServices = [...formData.moreInfo];
    updatedSubServices[index][field] = value;
    setFormData({ ...formData, moreInfo: updatedSubServices });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Prepare the data using FormData to send the file along with other form fields
    const data = new FormData();
    data.append('title', formData.title);
    data.append('description', formData.description);
    data.append('selectedFile', selectedFile); // Add the selected file

    // Append subservices to FormData as a JSON string
    data.append('moreInfo', JSON.stringify(formData.moreInfo)); 

    const result = dispatch(postData(data));
    // if(result){
    //   navigate('/admin/dashboard');
    // }
  }

  return (
    <form onSubmit={handleSubmit} className='pt-5 my-5 w-50 mx-auto bg-info px-5 border-rounded'>
      <h2>Create a New blog Post</h2>
      
      <div>
        <label className='form-label'>Title:</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required 
          className='form-control'
        />
      </div>

      <div>
        <label className='form-label'>Description:</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
          className='form-control'
        />
      </div>

      <div>
        <label className='form-label'>Selected File (Image):</label>
        <input
          type="file"
          name="selectedFile"
          onChange={handleFileChange}
          required
          className='form-control'
        />
      </div>

      <h3 className='my-2'>Sub Services</h3>
      {formData.moreInfo.map((moreInfo, index) => (
        <div key={index}>
          <div>
            <label className='form-label'>More details about blog post{index + 1} Title:</label>
            <input
              type="text"
              name={`title_${index + 1}`}
              value={moreInfo.title}
              onChange={(e) =>
                handleSubServiceChange(index, 'title', e.target.value)
              }
              className='form-control'
            />
          </div>

          <div>
            <label className='form-label'>More details {index + 1} Notes:</label>
            <textarea
              name={`notes_${index + 1}`}
              value={moreInfo.notes}
              onChange={(e) =>
                handleSubServiceChange(index, 'notes', e.target.value)
              }
              className='form-control'
            />
          </div>
        </div>
      ))}
      <div className='d-flex justify-content-center my-4'>
        <button type="submit" className='btn btn-primary text-center'>Create Service</button>
      </div>
    </form>
  );
};

export default PostHome;
