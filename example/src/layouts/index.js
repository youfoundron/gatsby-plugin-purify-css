import React from 'react'
import Scrollbar from 'react-perfect-scrollbar'

import '../styles/index.scss'
import Header from '../components/Header'
import Footer from '../components/Footer'

const Layout = ({ location: { pathname }, children }) => (
  <Scrollbar>
    <div className='flex flex-column flex-auto min-vh-100'>
      <Header pathname={pathname} />
      <main className='flex-auto'>
        { children() }
      </main>
      <Footer />
    </div>
  </Scrollbar>
)

export default Layout
