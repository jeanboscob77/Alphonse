import React from 'react'
import { Link } from 'react-router-dom'
import { FaWhatsapp } from 'react-icons/fa'
import { motion } from 'framer-motion'
const Whatsapp = () => {
  return (
    <motion.div className='whatsapp'
    initial={{x: 0}}
    animate={{ x: [0, -70, 0],}}
    transition={{
        duration: 5,
        ease: "easeInOut",
        repeat: Infinity, // Repeat infinitely
        repeatType: "loop", // Type of repeat
    }}
    >
       <Link  to="https://wa.me/250783871348?text=Hello%20I'm%20interested%20in%20your%20services"
    target='_blank' className='Link text-light fw-bold'>
    <FaWhatsapp  className='h4'/> Request service
    </Link>
    </motion.div>
  )
}

export default Whatsapp
