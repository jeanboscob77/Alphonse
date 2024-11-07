import React,{useState,useEffect} from 'react'
import { useDispatch,useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { FaFacebook, FaInstagram, FaLinkedin, FaTiktok, FaTwitter, FaWhatsapp } from 'react-icons/fa'
import { motion } from 'framer-motion'
import { fetchService } from '../redux/Services'
const Footer = () => {

  const [isLinkHovered, setIsLinkHovered] = useState('');
  

  function capitalizeText(text) {
    return text
      .toLowerCase() // Convert all text to lowercase
      .replace(/\b\w/g, (char) => char.toUpperCase()); // Capitalize the first letter of each word
  }
 

  const dispatch = useDispatch()
  const services  = useSelector(state=>state.services)


  useEffect(()=>{
    dispatch(fetchService())
  },[])


  
  return (
    <div className='bg-dark mt-auto pt-3'>
      <section className='d-flex flex-wrap justify-content-between mx-5 py-5'>
    <div className='d-flex justify-content-start'>
    <ul className='d-flex list-unstyled gap-4 mx-5'>
      <motion.li  
      whileHover={{scale: 1.3}}
      transition={{type: 'spring',stifness: 700,duration: 2}}
      >
      <Link  to="https://wa.me/250783871348?text=Hello%20I'm%20interested%20in%20your%20services"
    target='_blank'>
    <FaWhatsapp className={isLinkHovered === 'whatsapp'?'text-w fs-4': 'text-orange fs-4'}

onMouseEnter={() => setIsLinkHovered('whatsapp')}
onMouseLeave={() => setIsLinkHovered('')}
    />
    </Link>
      </motion.li>
      <motion.li
       whileHover={{scale: 1.3}}
       transition={{type: 'spring',stifness: 1000,duration: 2}}
      >
 
      <Link  to="https://wa.me/250783871348?text=Hello%20I'm%20interested%20in%20your%20services"
    target='_blank'>
        <FaLinkedin className={isLinkHovered === 'linkedin'?'text-w fs-4': 'text-orange fs-4'}

  onMouseEnter={() => setIsLinkHovered('linkedin')}
   onMouseLeave={() => setIsLinkHovered('')}
        />
    </Link>
      </motion.li>
      <motion.li
       whileHover={{scale: 1.3,}}
       transition={{type: 'spring',stifness: 1000,duration: 2}}
      >
        
    <Link  to="https://wa.me/250783871348?text=Hello%20I'm%20interested%20in%20your%20services"
    target='_blank'>
      <FaTwitter className={isLinkHovered === 'twitter'?'text-w fs-4': 'text-orange fs-4'}

onMouseEnter={() => setIsLinkHovered('twitter')}
onMouseLeave={() => setIsLinkHovered('')}
      />
    </Link>
      </motion.li>
      <motion.li
       whileHover={{scale: 1.3}}
       transition={{type: 'spring',stifness: 700,duration: 2}}
      >
        
    <Link  to="https://wa.me/250783871348?text=Hello%20I'm%20interested%20in%20your%20services"
    target='_blank'>
    <FaInstagram className={isLinkHovered === 'ig'?'text-w fs-4': 'text-orange fs-4'}
       onMouseEnter={() => setIsLinkHovered('ig')}
       onMouseLeave={() => setIsLinkHovered('')}
    />
    </Link>
      </motion.li>
      <motion.li
       whileHover={{scale: 1.3}}
       transition={{type: 'spring',stifness: 700,duration: 2}}
      >
        
    <Link  to="https://wa.me/250783871348?text=Hello%20I'm%20interested%20in%20your%20services"
    target='_blank'>
     <FaTiktok className={isLinkHovered === 'tiktok'?'text-w fs-4': 'text-orange fs-4'}
       onMouseEnter={() => setIsLinkHovered('tiktok')}
       onMouseLeave={() => setIsLinkHovered('')}
     />
    </Link>
      </motion.li>

      <motion.li
       whileHover={{scale: 1.3}}
       transition={{type: 'spring',stifness: 2000,duration: 2}}
      >
        
    <Link  to="https://wa.me/250783871348?text=Hello%20I'm%20interested%20in%20your%20services"
    target='_blank'>
     <FaFacebook className={isLinkHovered === 'facebook'?'text-w fs-4': 'text-orange fs-4'}
       onMouseEnter={() => setIsLinkHovered('facebook')}
       onMouseLeave={() => setIsLinkHovered('')}
     />
    </Link>
      </motion.li>
    </ul>
    </div>

<div>
  <ul>
    {
      services.data && services.data.length >
       0 && services.data.length <= 10 && services.data.map((item)=>(
        <li key={item._id} className=''><Link to={`/service/details/${item._id}`}
        className='text'
>
          {capitalizeText(item.title)}</Link></li>
       ))
    }
  </ul>
</div>

</section>


<div className='d-flex justify-content-center address'>
<address className='text-light'>
        INFO TECH SCHOLARS LTD.<br/>
        Kigali, Rwanda<br/>
       Email: <a href="mailto:infotechscholars1@gmail.com?subject=Hello%20there&body=I%20am%20interested%20in%20your%20services.">
        infotechscholars1@gmail.com
          </a><br/>
        Phone: +250 783 871 348
    </address>
</div>

      <p className='text-center text-light'>Info tech scholars Ltd allright reserved &copy; {new Date().getFullYear()}</p>
    </div>
  )
}

export default Footer
