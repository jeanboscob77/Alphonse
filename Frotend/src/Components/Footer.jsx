import React,{useState} from 'react'
import { Link } from 'react-router-dom'
import { FaFacebook, FaInstagram, FaLinkedin, FaTiktok, FaTwitter, FaWhatsapp } from 'react-icons/fa'
import { motion } from 'framer-motion'
const Footer = () => {

  const [isLinkHovered, setIsLinkHovered] = useState('');
  
  return (
    <div className='bg-dark mt-auto pt-3'>
    <div className='d-flex justify-content-end'>
    <ul className='d-flex list-unstyled gap-4 mx-5'>
      <motion.li  
      whileHover={{scale: 1.3}}
      transition={{type: 'spring',stifness: 700,duration: 2}}
      >
      <Link  to="https://wa.me/250783871348?text=Hello%20I'm%20interested%20in%20your%20services"
    target='_blank'>
    <FaWhatsapp className={isLinkHovered === 'whatsapp'?'text-w': 'text-orange'}

onMouseEnter={() => setIsLinkHovered('whatsapp')}
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
        <FaLinkedin className={isLinkHovered === 'linkedin'?'text-w': 'text-orange'}

  onMouseEnter={() => setIsLinkHovered('linkedin')}
   onMouseLeave={() => setIsLinkHovered('')}
        />
    </Link>
      </motion.li>
      <motion.li
       whileHover={{scale: 1.3,}}
       transition={{type: 'spring',stifness: 700,duration: 2}}
      >
        
    <Link  to="https://wa.me/250783871348?text=Hello%20I'm%20interested%20in%20your%20services"
    target='_blank'>
      <FaTwitter className={isLinkHovered === 'twitter'?'text-w': 'text-orange'}

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
    <FaInstagram className={isLinkHovered === 'ig'?'text-w': 'text-orange'}
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
     <FaTiktok className={isLinkHovered === 'tiktok'?'text-w': 'text-orange'}
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
     <FaFacebook className={isLinkHovered === 'facebook'?'text-w': 'text-orange'}
       onMouseEnter={() => setIsLinkHovered('facebook')}
       onMouseLeave={() => setIsLinkHovered('')}
     />
    </Link>
      </motion.li>
    </ul>
   
    </div>
      <p className='text-center text-light'>Alphonse allright reserved &copy; {new Date().getFullYear()}</p>
    </div>
  )
}

export default Footer
