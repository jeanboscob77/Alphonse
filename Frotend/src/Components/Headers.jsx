
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FaBars } from 'react-icons/fa';
import { MdClose } from 'react-icons/md';
import { motion, AnimatePresence } from 'framer-motion';
import logo from '../Photos/logo.webp'

const Headers = () => {
  const [isMenuCollapsed, setIsMenuCollapsed] = useState(true);
  const handleToggle = () => {
    setIsMenuCollapsed(!isMenuCollapsed);
  };
  

  const [cms,setCms] = useState('')

  

  const [isLinkHovered, setIsLinkHovered] = useState('');
console.log(cms);

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-blue fixed-top py-4">
      <div className="container-fluid">
        <NavLink className="navbar-brand d-flex align-items-center text-light" to="/">
          <img src={logo} alt="Logo" width="50" height="50" className="d-inline-block align-text-top logo" />
          <span className="ms-2 fs-4">INFO TECH SCHOLARS LTD</span>
        </NavLink>

        <button
          className="navbar-toggler bg-light my-3 my-sm-0"
          type="button"
          onClick={handleToggle}
          aria-expanded={!isMenuCollapsed}
          aria-label="Toggle navigation"
        >
          {isMenuCollapsed ? <FaBars /> : <MdClose />}
        </button>

        <div className={`navbar-collapse ${!isMenuCollapsed && 'show'}`}>
          <AnimatePresence>
            {!isMenuCollapsed && (
              <motion.ul
                className="navbar-nav mx-4" // Changed mx-3 to mx-auto for centering
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.4 }}
              >
                <li className="nav-item">
                  <NavLink className="nav-link text-light my-2" to="/" onClick={handleToggle}>HOME</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link text-light my-2" to="/about" onClick={handleToggle}>ABOUT US</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link text-light my-2" to="/services" onClick={handleToggle}>SERVICES</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link text-light my-2" to="/contact" onClick={handleToggle}>CONTACT US</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link text-light my-2" to="/cms" onClick={handleToggle}>CMS</NavLink>
                </li>
              </motion.ul>
            )}
          </AnimatePresence>

          {/* Displaying the menu as static on larger screens */}
          <ul className="navbar-nav ms-auto d-none d-lg-flex">
            <motion.li className="nav-item"
              whileHover={{ scale: 1.1, originX: 0 }}
              transition={{ type: 'spring', stiffness: 500 }}
            >
              <NavLink className={`${isLinkHovered === 'home' && 'hover-link'} nav-link orange-link fs-4`} to="/"
                onMouseEnter={() => setIsLinkHovered('home')}
                onMouseLeave={() => setIsLinkHovered('')}
                onClick={()=>setCms('')}
              >HOME</NavLink>
            </motion.li>
            <motion.li className="nav-item"
              whileHover={{ scale: 1.1, originX: 0 }}
              transition={{ type: 'spring', stiffness: 500 }}
            >
              <NavLink className={`${isLinkHovered === 'about' && 'hover-link'} nav-link orange-link fs-4`} to="/about"
                onMouseEnter={() => setIsLinkHovered('about')}
                onMouseLeave={() => setIsLinkHovered('')}
                onClick={()=>setCms('')}
              >ABOUT US</NavLink>
            </motion.li>
            <motion.li className="nav-item"
              whileHover={{ scale: 1.1, originX: 0 }}
              transition={{ type: 'spring', stiffness: 500 }}
            >
              <NavLink className={`${isLinkHovered === 'service' && 'hover-link'} nav-link orange-link fs-4`} to="/services"
                onMouseEnter={() => setIsLinkHovered('service')}
                onMouseLeave={() => setIsLinkHovered('')}
                onClick={()=>setCms('')}
              >SERVICES</NavLink>
            </motion.li>
            <motion.li className="nav-item"
              whileHover={{ scale: 1.1, originX: 0 }}
              transition={{ type: 'spring', stiffness: 500 }}
            >
              <NavLink className={`${isLinkHovered === 'contact' && 'hover-link'} nav-link orange-link fs-4`} to="/contact"
                onMouseEnter={() => setIsLinkHovered('contact')}
                onMouseLeave={() => setIsLinkHovered('')}
                onClick={()=>setCms('')}
              >CONTACT US</NavLink>
            </motion.li>
            <motion.li className="nav-item"
              whileHover={{ scale: 1.1, originX: 0 }}
              transition={{ type: 'spring', stiffness: 500 }}
            >
              <NavLink className={`${isLinkHovered == 'cms' && 'hover-link' } ${cms? 'active-link':''}nav-link orange-link fs-4`} to="/cms"
                onMouseEnter={() => setIsLinkHovered('cms')}
                onMouseLeave={() => setIsLinkHovered('')}
                onClick={()=>setCms('cms')}
              >CMS</NavLink>
            </motion.li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Headers