import React,{useState,useEffect} from 'react'
import { useDispatch,useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { FaFacebook,  FaLinkedin, FaTwitter, FaWhatsapp } from 'react-icons/fa'
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
    <div className='bg-dark mt-auto pt-3 w-100 mx-0'>
      <section className='d-grid d-md-flex gap-3" justify-content-around flex-wrap py-5'>




<div className=' my-sm-4 my-xs-4'>
  <h5 className='text-light'>LOCATION</h5>

  <div className='text-light'>
        INFO TECH SCHOLARS LTD.<br/>
        Kigali, Rwanda<br/>
    </div>
  
</div>



<div className='my-sm-4 my-xs-4'>


  
<h5 className='text-light footing'>SERVICES</h5>

<ul>
  {
    services.data && services.data.length >
     0 && services.data.length <= 10 && services.data.map((item)=>(
      <li key={item.id} className=''><Link to={`/service/details/${item.id}`}
      className='text'
>
        {capitalizeText(item.title)}</Link></li>
     ))
  }
</ul>
</div>


<div className='text-light  my-sm-4 footing'>
  <h5 className='text-light'>CONTACT</h5>
 Email: <a href="mailto:infotechscholars1@gmail.com?subject=Hello%20there&body=I%20am%20interested%20in%20your%20services."
 className='text-light'>
        infotechscholars1@gmail.com
          </a><br/>
  Phone: +250 783 871 348<br/>
  Phone: +250 725 849 807 <br/>
  Phone: +250 787 941 644
</div>


    <div className=' my-sm-4  d-sm-block'>
      <h5 className='text-light my-sm-5 footing'>SOCIAL MEDIA</h5>
    <ul className='d-flex list-unstyled gap-4'>
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
 
      <Link  to="https://www.linkedin.com/in/hagenimana-alphonse-70ba29263/"
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
        
    <Link  to="https://x.com/100_dieu"
    target='_blank'>
      <FaTwitter className={isLinkHovered === 'twitter'?'text-w fs-4': 'text-orange fs-4'}

onMouseEnter={() => setIsLinkHovered('twitter')}
onMouseLeave={() => setIsLinkHovered('')}
      />
    </Link>
      </motion.li>
    
      <motion.li
       whileHover={{scale: 1.3}}
       transition={{type: 'spring',stifness: 2000,duration: 2}}
      >
    <Link  to="https://web.facebook.com/hagenimana.alphonse.7161"
    target='_blank'>
     <FaFacebook className={isLinkHovered === 'facebook'?'text-w fs-4': 'text-orange fs-4'}
       onMouseEnter={() => setIsLinkHovered('facebook')}
       onMouseLeave={() => setIsLinkHovered('')}
     />
    </Link>
      </motion.li>
    </ul>
    </div>



</section>

      <p className='text-center text-light copy'> &copy; Copyright {new Date().getFullYear()}. All Rights reserved</p>
    </div>
  )
}
export default Footer
