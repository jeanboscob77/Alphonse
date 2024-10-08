import React,{useState} from 'react'
// import { useNavigate } from 'react-router-dom'
import PostTable  from '../CMS/PostTable'
import HomeTable from '../CMS/HomeTable'
import ContactTable from './ContactTable'

const AdminDashBoard = () => {


  //navigating between home and service 
  const [switchTab,setSwitchTab] = useState('')

  return (
    <div className='pt-5 mt-5'>
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
