import React, { useEffect, useState } from 'react'
import {motion} from 'framer-motion'
import { useParams } from 'react-router-dom'
import axios from 'axios'


const DetailedService = () => {

  const [service,setService] = useState([])
    const {id} = useParams()

console.log(service);

useEffect(() => {
    axios.get(`https://infotechscholars.com/api/services/${id}`)
      .then((response) => setService(response.data))
      .catch((error) => console.error("Error fetching service:", error));
  }, [id]); // Make sure `id` is in the dependency array

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
          <h3 className="mt-5 text-center">{service.title}</h3>
          <img
            src={`https://infotechscholars.com/${service.selectedFile}`}
            className="img-fluid rounded mx-auto d-block my-3"
            alt="Service"
          />
          <div className="mb-4">{service.description}</div>
          <div>
            <h4 className="mt-4">Our service includes</h4>
            {service.subServices && service.subServices.length > 0 ? (
              service.subServices.map((item) => (
                <div key={item._id} className="mb-3">
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

export default DetailedService
