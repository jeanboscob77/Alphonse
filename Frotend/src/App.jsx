import React, { useEffect, Suspense } from "react";
import { useSelector, useDispatch } from "react-redux";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { setUser } from "./redux/isLogged";
import { jwtDecode } from "jwt-decode";

// Regular imports for components that are always displayed
import Headers from './Components/Headers';
import Footer from './Components/Footer';
import Whatsapp from './Sub components/Whatsapp';

// Lazy loading components
const Home = React.lazy(() => import('./Components/Home'));
const AboutUs = React.lazy(() => import('./Components/About'));
const Services = React.lazy(() => import('./Components/Services'));
const SingleService = React.lazy(() => import('./Components/SingleService'));
const DetailedService = React.lazy(() => import('./Components/MoreAboutService'));
const Contact = React.lazy(() => import('./Components/Contact'));
const AdminLoginForm = React.lazy(() => import('./Components/Cms'));
const PostHome = React.lazy(() => import('./Sub components/Molecules/PostHome'));
const PostService = React.lazy(() => import('./Sub components/Molecules/PostService'));
const UpdateHome = React.lazy(() => import('./Sub components/Molecules/UpdateHome'));
const UpdateService = React.lazy(() => import('./Sub components/Molecules/UpdateService'));
const AdminDashBoard = React.lazy(() => import('./CMS/AdminDashBoard'));
const SingleBlog = React.lazy(() => import('./Components/singleBlog'));

function App() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const User = jwtDecode(token); 
      dispatch(setUser(User));
    }
  }, [dispatch]);

  return (
    <Router>
      <div className="d-flex flex-column min-vh-100">
        <Headers />
        <Whatsapp />

        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/services" element={<Services />} />
            <Route path="/service/read more/:id" element={<SingleService />} />
            <Route path="/service/details/:id" element={<DetailedService />} />
            <Route path="/blog/read more/:id" element={<SingleBlog />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/cms" element={<AdminLoginForm />} />

            {/* Protected Routes (accessible only when logged in) */}
            {user ? (
              <>
                <Route exact path="/create/blog" element={<PostHome />} />
                <Route path="/create/service" element={<PostService />} />
                <Route path="/update/blog/:id" element={<UpdateHome />} />
                <Route path="/update/service/:id" element={<UpdateService />} />
                <Route path="/admin/dashboard" element={<AdminDashBoard />} />
              </>
            ) : (
              // Redirect to login page if not logged in
              <Route path="*" element={<Navigate to="/cms" />} />
            )}
          </Routes>
        </Suspense>

        <Footer /> {/* Always render the Footer at the bottom */}
      </div>
    </Router>
  );
}

export default App;
