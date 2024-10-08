import React, { useState,useEffect} from "react";
import { useNavigate } from 'react-router-dom'
import AOS from 'aos';
import 'aos/dist/aos.css';
import CmsCard from "../Sub components/CmsCard";


const AdminLoginForm = ({isLoggedIn}) => {

const navigate = useNavigate()


  useEffect(() => {
    AOS.init({
      duration: 1200,  // Duration of the animation (in milliseconds)
      offset: 100,     // Offset from the top when animation should trigger
      once: false,
      mirror: true      // Whether animation should happen only once
    });
  }, []);

 // Initialize the formData state with username and password
 const [formData, setFormData] = useState({ username: "", password: "" });
 const [isLogged,setIsLogged] = useState(false)

 const handleChange = (e) => {
   // Update the formData state based on the input field changes
   setFormData({ ...formData, [e.target.name]: e.target.value });
 };

 const handleLogin = (data) => {
   // Handle the login logic here with the form data
   console.log('Login data:', data);
   if(formData.username === 'bosco' && formData.password ==='bosco'){
     setIsLogged(!isLogged)
     navigate('/admin/dashboard')
   }

 };

//  <button className='btn btn-success' onClick={handleLogout}>Log out</button>

//handle log out buttton
 const handleLogout = ()=>{
 setIsLogged(!isLogged)
 }


  return (
    <div className='pt-5 mt-5'>
        <div className="container-fluid d-flex justify-content-center align-items-center min-vh-100 pt-5 pb-3 cms"
    data-aos='fade-down'>

      <CmsCard 
        handleSubmit={handleLogin} 
        handleChange={handleChange} 
        formData={formData} 
        setIsLoggedIn={isLoggedIn}
      />
    </div>
    </div>
  );
};

export default AdminLoginForm;
