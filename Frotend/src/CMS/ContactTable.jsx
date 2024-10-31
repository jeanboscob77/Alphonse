import React,{useEffect} from 'react'
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useDispatch,useSelector } from 'react-redux';
import { fetchApi } from '../redux/ApiSlice';

const ContactTable = () => {



  useEffect(() => {
    AOS.init({
      duration: 1200,  // Duration of the animation (in milliseconds)
      offset: 100,     // Offset from the top when animation should trigger
      once: false,
      mirror: true      // Whether animation should happen only once
    });
  }, []);


  const dispatch = useDispatch()
  const contacts = useSelector(state=>state.api)

  useEffect(()=>{
     dispatch(fetchApi('http://localhost:5000/api/contacts'))
  },[])


  return (
    <div className='container'>
    {
      contacts.loading? <h1>Loading......</h1>: contacts.data.length >0?
    
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
            contacts.data && contacts.data.length > 0 && contacts.data.map((item)=><tr key={item._id}>
                <td>{item.name}</td>
                <td>{item.email}</td>
                <td>{item.message}</td>
                <td>{new Date(item.createdAt).toLocaleDateString()}</td>
            </tr>)
         }
        </tbody>
      </table>
      : <h1 className='text-center text-warning'>No people contacted you 😭😭😭</h1>
    }
    </div>
  )
}

export default ContactTable
