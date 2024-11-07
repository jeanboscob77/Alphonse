import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const UpdateHome = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // Get the ID of the post to update

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

  useEffect(() => {
    // Fetch the existing post data using Axios
    axios.get(`http://localhost:5000/api/blogs/${id}`)
      .then(response => {
        const { title, description, moreInfo } = response.data;
        setFormData({
          title: title || '',
          description: description || '',
          moreInfo: moreInfo || formData.moreInfo
        });
      })
      .catch(error => {
        console.error("There was an error fetching the post data!", error);
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleSubServiceChange = (index, field, value) => {
    const updatedSubServices = [...formData.moreInfo];
    updatedSubServices[index][field] = value;
    setFormData({ ...formData, moreInfo: updatedSubServices });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const data = new FormData();
    data.append('title', formData.title);
    data.append('description', formData.description);
    if (selectedFile) data.append('selectedFile', selectedFile);
    data.append('moreInfo', JSON.stringify(formData.moreInfo));

    try {
      await axios.put(`http://localhost:5000/api/blogs/${id}`, data);
      navigate('/admin/dashboard');
    } catch (error) {
      console.error("There was an error updating the post!", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className='pt-5 my-5 w-50 mx-auto bg-info px-5 border-rounded'>
      <h2>Update Blog Post</h2>
      
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
          className='form-control'
        />
      </div>

      <h3 className='my-2'>Sub Services</h3>
      {formData.moreInfo.map((moreInfo, index) => (
        <div key={index}>
          <div>
            <label className='form-label'>More details about blog post {index + 1} Title:</label>
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
        <button type="submit" className='btn btn-primary text-center'>Update Post</button>
      </div>
    </form>
  );
};

export default UpdateHome;
