import { useNavigate, useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UpdateService = () => {

const {id} = useParams()

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
    // Fetch existing service data on component load
    const fetchService = async () => {
      try {
        const response = await axios.get(`https://infotechscholars.com/api/services/${id}`);
        const { title, description, moreInfo } = response.data;
        setFormData({ title, description, moreInfo });
      } catch (error) {
        console.error('Error fetching service data:', error);
      }
    };
    fetchService();
  }, []);

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
    if (selectedFile) {
      data.append('selectedFile', selectedFile);
    }
    data.append('moreInfo', JSON.stringify(formData.moreInfo));

    try {
      const response = await axios.put(`https://infotechscholars.com/api/services/${id}`, data, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log('Service Updated:', response.data);
      alert('Service updated successfully');
    } catch (error) {
      console.error('Error updating service:', error);
      alert('Error updating service. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className='pt-5 my-5 w-50 mx-auto bg-info px-5 border-rounded'>
      <h2>Update Service</h2>
      
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
      {formData.moreInfo.map((subService, index) => (
        <div key={index}>
          <div>
            <label className='form-label'>Sub Service {index + 1} Title:</label>
            <input
              type="text"
              name={`title_${index + 1}`}
              value={subService.title}
              onChange={(e) =>
                handleSubServiceChange(index, 'title', e.target.value)
              }
              className='form-control'
            />
          </div>

          <div>
            <label className='form-label'>Sub Service {index + 1} Notes:</label>
            <textarea
              name={`notes_${index + 1}`}
              value={subService.notes}
              onChange={(e) =>
                handleSubServiceChange(index, 'notes', e.target.value)
              }
              className='form-control'
            />
          </div>
        </div>
      ))}
      <div className='d-flex justify-content-center my-4'>
        <button type="submit" className='btn btn-primary text-center'>Update Service</button>
      </div>
    </form>
  );
};

export default UpdateService;
