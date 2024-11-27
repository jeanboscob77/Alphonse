import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { fetchApi } from '../redux/ApiSlice';
import { useParams } from 'react-router-dom';

const SingleBlog = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const service = useSelector((state) => state.api);



  // Safely parse the `moreInfo` field if it exists
  const moreInfo = service.data?.moreInfo
    ? JSON.parse(service.data.moreInfo)
    : [];


    console.log(service);
    
  useEffect(() => {
    dispatch(fetchApi(`https://infotechscholars.com/api/blogs/${id }`));
  }, [dispatch, id]);

  return (
    <div className="container mt-5">
      <div>
        {service.loading ? (
          <h2 className="text-center">Loading...</h2>
        ) : (
          <motion.div
            className="row"
            initial={{ translateX: '-100%', opacity: 0 }}
            animate={{ translateX: 0, opacity: 1 }}
            transition={{ duration: 0.5, type: 'spring' }}
          >
            <div className="col-md-8 offset-md-2">
              {/* Title */}
              <h3 className="mt-5 text-center headering">
                {service['data'].title}
              </h3>

              {/* Image */}
            
                <img
                  src={`https://infotechscholars.com/${service['data'].selectedFile}`}
                  className="img-fluid rounded mx-auto d-block my-3"
                  alt={service['data'].title }
                />
            

              {/* Description */}
              <div className="mb-4">
                {service['data'].description}
              </div>

              {/* More Info Section */}
              <div>
                <h4 className="mt-4">Our Service Includes:</h4>
                {moreInfo && moreInfo.length > 0 ? (
                  moreInfo.map((item, index) => (
                    <div key={index} className="mb-3">
                      <h4>{item.title}</h4>
                      <p>{item.notes}</p>
                    </div>
                  ))
                ) : (
                  <p>No sub-services available.</p>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default SingleBlog;
