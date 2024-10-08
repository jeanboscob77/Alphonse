import React,{useState,useEffect} from 'react'
import { Link} from 'react-router-dom'

import AOS from 'aos';
import 'aos/dist/aos.css';
import axios from 'axios'

const ContactTable = () => {



  useEffect(() => {
    AOS.init({
      duration: 1200,  // Duration of the animation (in milliseconds)
      offset: 100,     // Offset from the top when animation should trigger
      once: false,
      mirror: true      // Whether animation should happen only once
    });
  }, []);



const [contacts,setContacts] = useState([])


useEffect(()=>{
axios.get('http://localhost:5000/api/contacts').then((res)=>{
  if(res.data){
    setContacts(res.data)
  }
  
})
.then((error)=>{
console.log(error);

})

},[])




  return (
    <div className='container'>
      <table className='table table-bordered table-hover table-responsive' data-aos='slide-up'>
        <thead>
        <tr className='table-dark'>
            <th>Name</th>
            <th>Email</th>
            <th>Message</th>
            <th>Date</th>
            </tr>
        </thead>
        <tbody>
         {
            contacts.map((item,i)=><tr key={item._id}>
                <td>{item.name}</td>
                <td>{item.email}</td>
                <td>{item.message}</td>
                <td>{new Date(item.createdAt).toLocaleDateString()}</td>
            </tr>)
         }
        </tbody>
      </table>
    </div>
  )
}

export default ContactTable
