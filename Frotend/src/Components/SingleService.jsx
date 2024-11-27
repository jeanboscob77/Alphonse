import React, { useEffect } from 'react'
import {motion} from 'framer-motion'
import { useDispatch,useSelector } from 'react-redux'
import { fetchApi } from '../redux/ApiSlice'
import { useParams } from 'react-router-dom'



const SingleService = () => {


    const {id} = useParams()
    
const dispatch = useDispatch()
const service = useSelector(state=>state.api)
console.log(service);


const moreInfo = service.data?.moreInfo
    ? JSON.parse(service.data.moreInfo)
    : [];


useEffect(()=>{
   dispatch(fetchApi(`https://infotechscholars.com/api/services/${id}`))
},[])

  return (
    <div className="container mt-5">
  <div>
    {service.loading ? (
      <h2 className="text-center">Loading...</h2>
    ) : (
      <motion.div className="row"
      initial={{translateY: '-100%', opacity: 0}}
      animate={{translateY: 0, opacity: 1}}
      transition={{duration: 1, type: 'keyframes'}}
      >
        <div className="col-md-8 offset-md-2">
          <h3 className="mt-5 pt-5 text-center headering fw-bold">{service['data'].title}</h3>
          <img
            src={`https://infotechscholars.com/${service['data'].selectedFile}`}
            className="img-fluid rounded mx-auto d-block my-3"
            alt="Service"
          />
          <div className="mb-4">{service['data'].description}</div>
          <div>
            <h4 className="mt-4">Our service includes</h4>
            {moreInfo && moreInfo.length > 0 ? (
              moreInfo.map((item) => (
                <div key={item.id} className="mb-3">
                  <h4>{item.title}</h4>
                  <p>{item.notes}</p>
                </div>
              ))
            ) : (
              <p>No sub-services available</p>
            )}
          </div>
        </div>
      </motion.div>
    )}
  </div>
</div>

  )
}

export default SingleService
