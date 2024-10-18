import React,{useEffect} from 'react'
import { useDispatch,useSelector } from 'react-redux'
import ServiceCard from '../Sub components/ServiceCard'
import { fetchService } from '../redux/Services'

const Services = () => {


  
  const dispatch = useDispatch()
  const services  = useSelector(state=>state.services)


  useEffect(()=>{
    dispatch(fetchService())
  },[])



  console.log(services);
  
 
  return (
    <div className='margin-top container-fluid'>
    {
      Services.loading?(
      <p>Loading services....</p>
      )
      :(
        <div>
        <h1 className='text-center'>Service we offer</h1>
    <div className='container m-5 d-flex flex-wrap justify-content-between'>
      {services.data && services.data.length > 0 && services.data.map((item) => (
        <div className='d-flex' key={item._id} style={{ flex: '1 1 calc(33.33% - 20px)', margin: '10px' }}>
          <ServiceCard 
          src={`http://localhost:5000/${item.selectedFile.replace(/\\/g,'/')}`} 
          title={item.title} about={item.description} path={`/service/more/${item._id}`} />
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
