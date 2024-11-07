import React, { useEffect } from 'react'
import {motion} from 'framer-motion'
import { useDispatch,useSelector } from 'react-redux'
import { fetchApi } from '../redux/ApiSlice'
import { useParams } from 'react-router-dom'



const SingleBlog = () => {


    const {id} = useParams()
const dispatch = useDispatch()
const service = useSelector(state=>state.api)
console.log(service);


useEffect(()=>{
   dispatch(fetchApi(`http://localhost:5000/api/blogs/${id}`))
},[])

  return (
    <div className="container mt-5">
  <div>
    {service.loading ? (
      <h2 className="text-center">Loading...</h2>
    ) : (
      <motion.div className="row"
      initial={{translateX: '-100%', opacity: 0}}
      animate={{translateX: 0, opacity: 1}}
      transition={{duration: 5, type: 'spring'}}
      >
        <div className="col-md-8 offset-md-2">
          <h3 className="mt-5 text-center">{service['data'].title}</h3>
          <img
            src={`http://localhost:5000/${service['data'].selectedFile}`}
            className="img-fluid rounded mx-auto d-block my-3"
            alt="Service"
          />
          <div className="mb-4">{service['data'].description}</div>
          <div>
            <h4 className="mt-4">Our service includes</h4>
            {service.data.moreInfo && service.data.moreInfo.length > 0 ? (
              service.data.moreInfo.map((item) => (
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

export default SingleBlog
