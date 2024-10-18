import React, { useEffect } from 'react'
import { useDispatch,useSelector } from 'react-redux'
import { fetchApi } from '../redux/ApiSlice'
import { useParams } from 'react-router-dom'



const SingleService = () => {


    const {id} = useParams()
const dispatch = useDispatch()
const service = useSelector(state=>state.api)
console.log(service);


useEffect(()=>{
   dispatch(fetchApi(`http://localhost:5000/api/services/${id}`))
},[])

  return (
    <div className="container mt-5">
  <div>
    {service.loading ? (
      <h2 className="text-center">Loading...</h2>
    ) : (
      <div className="row">
        <div className="col-md-8 offset-md-2">
          <h3 className="mt-5 text-center">{service['data'].title}</h3>
          <img
            src={`http://localhost:5000/${service['data'].selectedFile}`}
            className="img-fluid rounded mx-auto d-block my-3"
            alt="Service"
          />
          <div className="mb-4">{service['data'].description}</div>
          <div>
            <h4 className="mt-4">Sub-Services</h4>
            {service.data.subServices && service.data.subServices.length > 0 ? (
              service.data.subServices.map((item) => (
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
      </div>
    )}
  </div>
</div>

  )
}

export default SingleService
