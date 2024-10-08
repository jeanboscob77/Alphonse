import {useState} from 'react'
import Headers from './Components/Headers'
import {BrowserRouter as Router, Routes,Route ,Navigate} from 'react-router-dom'
import Home from './Components/Home'
import AboutUs from './Components/About'
import Services from './Components/Services'
import Contact from './Components/Contact'
import AdminLoginForm from './Components/Cms'
import Footer from './Components/Footer'
import Whatsapp from './Sub components/Whatsapp'
import PostHome from './Sub components/Molecules/PostHome'
import PostService from './Sub components/Molecules/PostService'
import UpdateHome from './Sub components/Molecules/UpdateHome'
import UpdateService from './Sub components/Molecules/UpdateService'
import AdminDashBoard from './CMS/AdminDashBoard'

function App() {

  const [isLogged,setIsLogged] = useState(false)


  return (

    <Router>
    <div className="d-flex flex-column min-vh-100">
    <Headers/>
    <Whatsapp />
      <Routes>
      <Route path='/' element={<Home/>} />
        <Route path='/about' element={<AboutUs/>} />
        <Route path='/services' element={<Services/>} />
        <Route path='/contact' element={<Contact/>} />
        <Route path='/cms' element={<AdminLoginForm isLoggedIn={setIsLogged}/>} />
        
 {/* Protected Routes (accessible only when logged in) */}
 {isLogged ? (
            <>
              <Route exact path='/create/blog' element={<PostHome/>} />
              <Route path='/create/service' element={<PostService/>}/>
              <Route path='/update/blog/:id' element={<UpdateHome/>}/>
              <Route path='/update/service/:id' element={<UpdateService/>}/>
              <Route path='/admin/dashboard' element={<AdminDashBoard/>}/>
            </>
          ) : (
            // If not logged in, redirect all protected routes to login page
            <Route path="*" element={<Navigate to="/cms" />} />
          )}

      </Routes>
      
      <Footer /> {/* Always render the Footer at the bottom */}
    </div>
  </Router>


  )
}

export default App
