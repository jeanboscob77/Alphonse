import { useDispatch , useSelector} from 'react-redux';
import AOS from 'aos';
import 'aos/dist/aos.css';
import {useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchBlogs } from '../redux/Blogs';

const getRecentPosts = (blogs) => {


  const today = new Date();
  
  return blogs && blogs.length >0 && blogs
    .filter(post => {
      const postDate = new Date(post.createdAt);  // Parse createdAt date
      const diffTime = Math.abs(today - postDate);  // Time difference in milliseconds
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));  // Convert to days
      return diffDays <= 10;  // Only include posts from the last 30 days
    })
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));  // Sort by date (newest first)
};


const Home = () => {

  const dispatch = useDispatch()
  const Blogs = useSelector(state=>state.blogs)
 

  useEffect(()=>{
    dispatch(fetchBlogs())
  },[])


  
  useEffect(() => {
    AOS.init({
      duration: 1200,  // Duration of the animation (in milliseconds)
      offset: 100,     // Offset from the top when animation should trigger
      once: false,
      mirror: true      // Whether animation should happen only once
    });
  }, []);




  const recentPosts = getRecentPosts(Blogs.data);

  return (
    <div className='pt-5 mt-5 holder'>
     
      <section className='section-one pt-5' data-aos='slide-left'>
      <div className="container">
      {/* Header Section */}
      <header className="text-center my-4">
        <h1 className="display-4 heading pt-3 header">INFO TECH SCHOLARS LTD</h1>
        <p className="lead fw-bold text-light fs-3">Pathway to Academic and Tech Solutions.</p>
      </header>

      {/* Recent Blog Posts Section */}
      {
        Blogs.isLoading?(
          <h1 className="text-center text-light">Loading blog posts...............</h1>
        ): 
        (
          <section className="mb-5">
        <h3 className="mb-4 text-light">Recent Blog Posts</h3>
        <div className="row">
          {recentPosts.length > 0 ? (
            recentPosts.map(post => (
              <div className="col-md-4 d-flex my-2" key={post._id}>
                <div className="card mb-4 h-100">
                <img  src={`http://localhost:5000/${post.selectedFile}`}
            alt={post.title}
            className='w-100 h-auto'/>
                  <div className="card-body d-flex flex-column flex-grow-1">
                    <h5 className="card-title font-family">{post.title}</h5>
                    <p className="card-text font-family">{post.description}</p>
                    <p className="card-text">
                     
                    </p>
                    <div className='mt-auto'>                    
                    <Link to={`/blog/more/${post._id}`} className="btn btn-success">Read More</Link>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className='text-danger fw-bold'>No recent posts available yet.</p>
          )}
        </div>
      </section>
        )
      }
     

      {/* Services Section */}
      <section className="mb-5">
        <h3 className="mb-4 text-light">Our Services</h3>
        <div className="row">
          {Blogs.data && Blogs.data.length > 0 && Blogs.data.map(post => (<div className="col-md-4 d-flex my-2" key={post._id}>
              <div className="card mb-4 h-100">
                <img  src={`http://localhost:5000/${post.selectedFile.replace(/\\/g, '/')}`}
            alt={post.title} className='w-100 h-auto'/>
                <div className="card-body d-flex flex-column flex-grow-1">
                  <h5 className="card-title">{post.title}</h5>
                  <p className="card-text">{post.description}</p>
                  <div className='mt-auto'>
                  <Link to={`/blog/more/${post._id}`} className="btn btn-primary">Learn More</Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
      </section>
    </div>
  )
}

export default Home
