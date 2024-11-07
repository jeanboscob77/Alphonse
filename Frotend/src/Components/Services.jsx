import React, { useEffect } from 'react'
import { Helmet } from 'react-helmet'
import { motion } from 'framer-motion'
import { useDispatch, useSelector } from 'react-redux'
import ServiceCard from '../Sub components/ServiceCard'
import { fetchService } from '../redux/Services'

const Services = () => {
  const dispatch = useDispatch()
  const services = useSelector(state => state.services)

  useEffect(() => {
    dispatch(fetchService())
  }, [dispatch])

  return (
    <div className="margin-top container-fluid">
      <Helmet>
        <title>Our services</title>
      </Helmet>

      {services.loading ? (
        <p>Loading services....</p>
      ) : (
        <div className="mt-4">
          <motion.h1
            className="text-center"
            initial={{ translateX: -100, opacity: 0 }}
            animate={{ translateX: 0, opacity: 1 }}
            transition={{ duration: 5, type: 'spring' }}
          >
            Our Services
          </motion.h1>

          <div className="container m-5 d-flex flex-wrap justify-content-between">
            {services.data && services.data.length > 0 && services.data.map((item) => (
              <motion.div
                key={item._id}
                className="d-flex"
                style={{ flex: '1 1 calc(33.33% - 20px)', margin: '10px' }}
                initial={{ opacity: 0, scale: 0.2 }}  // Start smaller
                whileInView={{ opacity: 1, scale: 1 }}  // Zoom in and become fully visible
                transition={{ duration: 0.8 }}           // Smooth transition for zoom effect
                viewport={{ once: false, amount: 0.3 }} // Trigger when 30% of the element is in view
              >
                <ServiceCard
                  src={`http://localhost:5000/${item.selectedFile.replace(/\\/g, '/')}`}
                  title={item.title}
                  about={item.description}
                  path={`/service/more/${item._id}`}
                />
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default Services
