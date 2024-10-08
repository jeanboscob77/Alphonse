import React,{useState,useEffect} from 'react'
import AOS from 'aos';
import 'aos/dist/aos.css';
import axios from 'axios';
const Contact = () => {



  useEffect(() => {
    AOS.init({
      duration: 1200,  // Duration of the animation (in milliseconds)
      offset: 100,     // Offset from the top when animation should trigger
      once: false,
      mirror: true      // Whether animation should happen only once
    });
  }, []);

const [name,setName] = useState('')
const [email,setEmail] = useState('')
const [message,setMessage] = useState('')

  
  //handle submit 
  const handleSubmit = (e) => {
    e.preventDefault();

    if(name.trim() !== '' && email.trim() && message.trim()){

      axios.post('http://localhost:5000/api/contacts',{name,email,message}).then((res)=>{
      
        setEmail('')
        setMessage('')
        setName('')
      
     })
     .then((error)=>{
     console.log(error)
     })
    }

    else{
      alert('Fill out all field!!!')
    }

  }




  return (
    <div className='margin-top pt-5'>
    <div className='contact' data-aos='flip-down'>
      <div className='d-flex justify-content-center my-5'>
      <form style={{ maxWidth: '400px',minWidth: '300px' }} className='bg-form py-3 px-4 h-auto rounded'>
       <h2 className='text-light text-center'>Contact Us</h2>
        <div>
          <label className='text-light'>Names:</label>
          <input type='text' className='form-control' value={name} onChange={(e)=>setName(e.target.value)}/>
        </div>
        <div className='my-3'>
        <label className='text-light'>Email:</label>
        <input type='email' className='form-control'  value={email}
         onChange={(e)=>setEmail(e.target.value)}/>
        </div>
        <div>
          <label className='text-light'>Message:</label>
          <textarea className='form-control'  value={message}
          onChange={(e)=>setMessage(e.target.value)}></textarea>
        </div>
        <div className='my-3 d-flex justify-content-center'>
          <button className='btn btn-primary w-25' onClick={handleSubmit}>Send</button>
        </div>
      </form>
      </div>

      <div>

      </div>
      </div>
      </div>
   
  )
}

export default Contact
