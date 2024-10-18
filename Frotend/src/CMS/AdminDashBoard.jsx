import React,{useState} from 'react'
import { useDispatch } from 'react-redux'
import { logout } from '../redux/isLogged'
// import { useNavigate } from 'react-router-dom'
import PostTable  from '../CMS/PostTable'
import HomeTable from '../CMS/HomeTable'
import ContactTable from './ContactTable'

const AdminDashBoard = () => {


  //navigating between home and service 
  const [switchTab,setSwitchTab] = useState('')
  const distpatch = useDispatch()

  const handleLogout = ()=>{
    localStorage.removeItem('token');
    distpatch(logout())
  }

  return (
    <div className='pt-5 mt-5'>
    <div className='d-flex justify-content-end my-3 mx-3'>
    <button className='btn btn-primary' onClick={()=>handleLogout()}>Logout</button>
    </div>
       <header className='d-flex justify-content-center my-3'>
          <button className='btn btn-info mx-5' onClick={()=>setSwitchTab('blog')}>Blog</button>
          <button className='btn btn-info mx-5' onClick={()=>setSwitchTab('service')}>Service</button>
          <button className='btn btn-info mx-5' onClick={()=>setSwitchTab('contact')}>Contacts</button>
        </header>
        <section>
          {
            switchTab === 'blog' ? <HomeTable/>: switchTab === 'service'?<PostTable/> : <ContactTable/>
          }
        </section>
    </div>
  )
}

export default AdminDashBoard
