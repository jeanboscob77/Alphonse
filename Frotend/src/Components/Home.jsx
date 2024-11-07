import { useDispatch, useSelector } from 'react-redux';
import { Helmet } from 'react-helmet';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchBlogs } from '../redux/Blogs';
import { motion, useMotionValue, useTransform } from 'framer-motion';

const getRecentPosts = (blogs) => {
  const today = new Date();
  
  return blogs && blogs.length > 0 && blogs
    .filter(post => {
      const postDate = new Date(post.createdAt);
      const diffTime = Math.abs(today - postDate);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return diffDays <= 10;
    })
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
};

const Home = () => {
  const dispatch = useDispatch();
  const Blogs = useSelector(state => state.blogs);

  useEffect(() => {
    dispatch(fetchBlogs());
  }, []);

  useEffect(() => {
    AOS.init({
      duration: 1200,
      offset: 100,
      once: false,
      mirror: true
    });
  }, []);

  // Set up a motion value for dynamic scroll effect
  const scrollY = useMotionValue(0);

  // Create a range-based transform for scale and rotate
  const scaleRange = useTransform(scrollY, [0, 300], [1, 1.05]);
  const rotateRange = useTransform(scrollY, [0, 300], [0, 10]);  // Rotates up to 10 degrees

  const recentPosts = getRecentPosts(Blogs.data);

  return (
    <div className="pt-5 mt-5 holder" data-aos='fade-down'>
      <Helmet>
        <title>Home</title>
      </Helmet>
      
      <motion.section
        className="section-one pt-5"
        data-aos="slide-left"
        style={{ scale: scaleRange, rotate: rotateRange }}
      >
        <div className="container">
          <header className="text-center my-4">
            <h1 className="display-4 heading pt-3 header">INFO TECH SCHOLARS LTD</h1>
            <p className="lead fw-bold text-light fs-3">Pathway to Academic and Tech Solutions.</p>
          </header>

          {Blogs.isLoading ? (
            <h1 className="text-center text-light">Loading blog posts...............</h1>
          ) : (
            <section className="mb-5">
              <h3 className="mb-4 text-light">Recent Blog Posts</h3>
              <div className="row">
                {recentPosts.length > 0 ? (
                  recentPosts.map(post => (
                    <motion.div
                      className="col-md-4 d-flex my-2"
                      key={post._id}
                      initial={{ opacity: 0, y: 50 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6 }}
                    >
                      <div className="card mb-4 h-100">
                        <img
                          src={`http://localhost:5000/${post.selectedFile}`}
                          alt={post.title}
                          className="w-100 h-auto"
                        />
                        <div className="card-body d-flex flex-column flex-grow-1">
                          <h5 className="card-title font-family">{post.title}</h5>
                          <p className="card-text font-family">{post.description}</p>
                          <div className="mt-auto">
                            <Link to={`/blog/more/${post._id}`} className="btn btn-success">
                              Read More
                            </Link>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))
                ) : (
                  <p className="text-danger fw-bold">No recent posts available yet.</p>
                )}
              </div>
            </section>
          )}

          <section className="mb-5">
            <h3 className="mb-4 text-light">Our Services</h3>
            <div className="row">
              {Blogs.data &&
                Blogs.data.length > 0 &&
                Blogs.data.map(post => (
                  <motion.div
                    className="col-md-4 d-flex my-2"
                    key={post._id}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                  >
                    <div className="card mb-4 h-100">
                      <img
                        src={`http://localhost:5000/${post.selectedFile.replace(/\\/g, '/')}`}
                        alt={post.title}
                        className="w-100 h-auto"
                      />
                      <div className="card-body d-flex flex-column flex-grow-1">
                        <h5 className="card-title">{post.title}</h5>
                        <p className="card-text">{post.description}</p>
                        <div className="mt-auto">
                          <Link to={`/blog/more/${post._id}`} className="btn btn-primary">
                            Learn More
                          </Link>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
            </div>
          </section>
        </div>
      </motion.section>
    </div>
  );
};

export default Home;
