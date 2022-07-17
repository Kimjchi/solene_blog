import React from 'react'
import Footer from './Footer';
import NavigationBar from './NavigationBar'

interface LayoutProps {
    children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <>
        <NavigationBar />
        {children}
        <div className='px-16'><Footer /></div>        
    </>
  )
}

export default Layout