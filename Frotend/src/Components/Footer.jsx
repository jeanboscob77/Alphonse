import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaEnvelopeSquare, FaFacebook, FaLinkedin, FaPhoneAlt, FaTwitter, FaWhatsapp, FaLaptopCode } from 'react-icons/fa';
import { FaLocationDot } from 'react-icons/fa6';
import { motion } from 'framer-motion';
import axios from 'axios';

const Footer = () => {
  const [services, setServices] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [visibleCount, setVisibleCount] = useState(3);
  const [isLinkHovered, setIsLinkHovered] = useState('');

  useEffect(() => {
    const fetchServices = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get('https://infotechscholars.com/api/services');
        setServices(response.data);
        setError(null);
      } catch (err) {
        setError('Failed to fetch services. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchServices();
  }, []);

  const handleShowMore = () => {
    setVisibleCount((prevCount) => Math.min(prevCount + 3, services.length));
  };

  const handleShowLess = () => {
    setVisibleCount(3);
  };

  const displayedServices = services.slice(0, visibleCount);

  function capitalizeText(text) {
    return text
      .toLowerCase()
      .replace(/\b\w/g, (char) => char.toUpperCase());
  }

  return (
    <div className="bg-dark mt-auto pt-3 w-100 mx-0">
      <section className="d-flex flex-wrap justify-content-between align-items-start py-5 gap-5">
        {/* Location Section */}
        <div className="col-lg-3 col-md-6 col-sm-12 text-light my-2 ms-3 ms-lg-5">
          <h5>
            <span className="fs-3 text-danger mx-2"><FaLocationDot /></span>
            LOCATION
          </h5>
          <p>
            INFO TECH SCHOLARS LTD.<br />
            Kigali, Rwanda
          </p>
        </div>

        {/* Services Section */}
        <div className="col-lg-3 col-md-6 col-sm-12 text-light my-2 ms-3">
          <h5>
            <span className="fs-3 text-teal mx-2"><FaLaptopCode /></span>
            SERVICES
          </h5>
          <div>
            {isLoading ? (
              <p className="text-center">Loading services...</p>
            ) : error ? (
              <p className="text-center text-danger">{error}</p>
            ) : (
              <ul className="list-group">
                {displayedServices.map((item) => (
                  <li key={item.id} className="list-group-item">
                    <Link to={`/service/read more/${item.id}`} className="text-decoration-none">
                      {capitalizeText(item.title)}
                    </Link>
                  </li>
                ))}
              </ul>
            )}

            {!isLoading && !error && (
              <div className="mt-3">
                {visibleCount < services.length && (
                  <button onClick={handleShowMore} className="btn btn-primary me-2">
                    Show More
                  </button>
                )}
                {visibleCount > 3 && (
                  <button onClick={handleShowLess} className="btn btn-secondary">
                    Show Less
                  </button>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Contact Section */}
        <div className="col-lg-3 col-md-6 col-sm-12 text-light my-2 ms-3">
          <h5>CONTACT</h5>
          <p>
            <FaEnvelopeSquare className="fs-4 text-email mx-2" />
            
              
              info@infotechscholars.com
            
            <br />
            <FaPhoneAlt className="text-info fs-4 mx-2" /> +250 783 871 348<br />
            <FaPhoneAlt className="text-info fs-4 mx-2" /> +250 725 849 807<br />
            <FaPhoneAlt className="text-info fs-4 mx-2" /> +250 787 941 644
          </p>
        </div>

        {/* Social Media Section */}
        <div className="col-lg-3 col-md-6 col-sm-12 text-light my-2 ms-3 ms-lg-5">
          <h5>SOCIAL MEDIA</h5>
          <ul className="d-flex list-unstyled gap-4">
            <motion.li whileHover={{ scale: 1.3 }} transition={{ type: 'spring', stiffness: 700, duration: 2 }}>
              <Link to="https://wa.me/250783871348?text=Hello%20I'm%20interested%20in%20your%20services" target="_blank">
                <FaWhatsapp className={isLinkHovered === 'whatsapp' ? 'text-w fs-4' : 'text-orange fs-4'}
                  onMouseEnter={() => setIsLinkHovered('whatsapp')}
                  onMouseLeave={() => setIsLinkHovered('')}
                />
              </Link>
            </motion.li>
            <motion.li whileHover={{ scale: 1.3 }} transition={{ type: 'spring', stiffness: 700, duration: 2 }}>
              <Link to="https://www.linkedin.com/in/hagenimana-alphonse-70ba29263/" target="_blank">
                <FaLinkedin className={isLinkHovered === 'linkedin' ? 'text-w fs-4' : 'text-orange fs-4'}
                  onMouseEnter={() => setIsLinkHovered('linkedin')}
                  onMouseLeave={() => setIsLinkHovered('')}
                />
              </Link>
            </motion.li>
            <motion.li whileHover={{ scale: 1.3 }} transition={{ type: 'spring', stiffness: 700, duration: 2 }}>
              <Link to="https://x.com/100_dieu" target="_blank">
                <FaTwitter className={isLinkHovered === 'twitter' ? 'text-w fs-4' : 'text-orange fs-4'}
                  onMouseEnter={() => setIsLinkHovered('twitter')}
                  onMouseLeave={() => setIsLinkHovered('')}
                />
              </Link>
            </motion.li>
            <motion.li whileHover={{ scale: 1.3 }} transition={{ type: 'spring', stiffness: 700, duration: 2 }}>
              <Link to="https://web.facebook.com/hagenimana.alphonse.7161" target="_blank">
                <FaFacebook className={isLinkHovered === 'facebook' ? 'text-w fs-4' : 'text-orange fs-4'}
                  onMouseEnter={() => setIsLinkHovered('facebook')}
                  onMouseLeave={() => setIsLinkHovered('')}
                />
              </Link>
            </motion.li>
          </ul>
        </div>
      </section>

      <p className="text-center text-light copy">&copy; Copyright {new Date().getFullYear()}. All Rights Reserved</p>
    </div>
  );
};

export default Footer;
