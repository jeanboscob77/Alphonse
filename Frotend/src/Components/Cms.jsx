import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { useNavigate } from 'react-router-dom';
import AOS from 'aos';
import { useDispatch } from "react-redux";
import { loginUser, setUser } from '../redux/isLogged'; // Import the setUser action
import { jwtDecode } from "jwt-decode";
import 'aos/dist/aos.css';
import CmsCard from "../Sub components/CmsCard";

const AdminLoginForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    AOS.init({
      duration: 3000,  // Duration of the animation (in milliseconds)
      offset: 100,     // Offset from the top when animation should trigger
      once: false,
      mirror: true      // Whether animation should happen only once
    });

    // Check if a token exists in local storage on component mount
    const token = localStorage.getItem('token');
    if (token) {
      const user = jwtDecode(token); // Decode the token to get user information
      dispatch(setUser(user)); // Set the user in the state (you'll need a setUser action)
      navigate('/admin/dashboard'); // Navigate to dashboard if token exists
    }
  }, [navigate, dispatch]);

  // Initialize the formData state with email and password
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    // Update the formData state based on the input field changes
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async () => {
  

    // Dispatch the login action and await the result
    const resultAction = await dispatch(loginUser({ email: formData.email, password: formData.password }));

    // Check if the action was fulfilled
    if (loginUser.fulfilled.match(resultAction)) {
      const { token } = resultAction.payload; // Get the token from the payload
      localStorage.setItem('token', token); // Store the token in local storage

      const user = jwtDecode(token); // Decode the token to get user information
      dispatch(setUser(user)); // Set the user in the state

      navigate('/admin/dashboard'); // If login is successful, navigate to the dashboard
    } else {
      // If login fails, show an alert with the error message
      alert(resultAction.error.message || 'Something went wrong');
    }
  };

  return (
    <div className='pt-5 mt-5'>
      <Helmet>
        <title>control management system</title>
        <meta property="og:title" content="Info Tech Scholars Ltd - Pathway to Academic and Tech Solutions" />
  <meta property="og:description" content="Welcome to Info Tech Scholars Ltd, your gateway to academic excellence and cutting-edge tech solutions." />
  <meta property="og:image" content="https://infotechscholars.com/path-to-your-image.jpg" />
  <meta property="og:url" content="https://infotechscholars.com" />
  <meta name="twitter:card" content="summary_large_image" />
      </Helmet>
      <div className="container-fluid d-flex justify-content-center align-items-center min-vh-100 pt-5 pb-3 cms"
        data-aos='fade-down'>
        <CmsCard 
          handleSubmit={handleLogin} 
          handleChange={handleChange} 
          formData={formData} 
        />
      </div>
    </div>
  );
};

export default AdminLoginForm;
