import React,{useState,useEffect} from 'react'
import axios from 'axios'
import ServiceCard from '../Sub components/ServiceCard'

const Services = () => {


  const [services,setServices] = useState([])
  const [loading, setLoading] = useState(true);  // Loading state
  
  
  useEffect(()=>{
  axios.get('http://localhost:5000/api/services').then((res)=>{
    if(res.data){
      setServices(res.data)
    }
    
  })
  .then((error)=>{
  console.log(error);
  })
  .finally(() => {
    setLoading(false);  // Stop loading after the data is fetched
  });
  }, []);

 
  return (
    <div className='margin-top container-fluid'>
    {
      loading?(
      <p>Loading services....</p>
      )
      :(
        <div>
        <h1 className='text-center'>Service we offer</h1>
    <div className='container m-5 d-flex flex-wrap justify-content-between'>
      {services.map((item, index) => (
        <div className='d-flex' key={item._id} style={{ flex: '1 1 calc(33.33% - 20px)', margin: '10px' }}>
          <ServiceCard 
          src={`http://localhost:5000/${item.selectedFile.replace(/\\/g,'/')}`} 
          title={item.title} about={item.description} path={'/'} />
        </div>
      ))}
    </div>
    </div>
      )
    }
  </div>
  
  )
}

export default Services
