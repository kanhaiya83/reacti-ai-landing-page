import React from 'react'
import Navbar from '../sections/navbar/Navbar'
import Header from './Header'

const Layout = ({children}) => {
  return (
    <div>
        <Navbar/>
        {children}
    </div>
  )
}

export default Layout