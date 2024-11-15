import React, { useEffect } from 'react';
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import AOS from 'aos';
import 'aos/dist/aos.css';
const ServiceCard = ({src,title,about,path})=>{

  useEffect(() => {
    AOS.init({
      duration: 1200,  // Duration of the animation (in milliseconds)
      offset: 100,     // Offset from the top when animation should trigger
      once: false,
      mirror: true      // Whether animation should happen only once
    });
  }, []);


    return(
     <div className='card flex-fill m-2'  style={{ minWidth: '300px' }} data-aos='zoom-in-up'>
            <img src={src} alt='Img' className="card-img-top w-100 h-auto"/>
            <div className="card-body d-flex flex-column flex-grow-1">
              <h3 className="card-title">{title}</h3>
              <p className="card-text">{about}</p>
              <div>
              </div>
              <motion.div className='mx-auto mt-auto'
              // whileHover={{backgroundColor: '#ffff',scale: 1.2}}
              // transition={{duration: 0.2,type:'spring', stiffness: 300}}
              >
              <Link to={path} className="btn btn-primary">Learn More</Link>
              </motion.div>
            </div>
          </div>
  
       
    
    )
    
  
}




//export by default servicecard
export default ServiceCard