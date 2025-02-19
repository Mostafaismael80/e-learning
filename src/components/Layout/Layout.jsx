import React from 'react'
// import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Footer from '../Footer/Footer'
import Navbar from '../Navbar/Navbar'




export default function Layout() {
    // const [first, setfirst] = useState(second)




  return (
    
      <>
      <Navbar/>
      <div className='py-32 container'>
      <Outlet/>
      </div>
      
      <Footer/>
      </>
   
  )
}
