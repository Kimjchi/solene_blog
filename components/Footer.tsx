import Link from 'next/link'
import React from 'react'

const Footer = () => {
  return (
    <footer className="flex h-full w-full footer px-16 pt-4 pb-8 justify-around text-center mb-4 md:flex-row flex-col rounded-lg">
        <div className='flex flex-col'>
            <span className='font-finlandica-500'>Navigation</span>
            <span>Historique des articles</span>
        </div>
        <div className='flex flex-col'>
            <span className='font-finlandica-500'>A propos</span>
            <span>Copyright 2022</span>
            <span>Mentions légales</span>
        </div>
        <div className='flex flex-col'>
            <span className='font-finlandica-500'>Contact</span>
            <span>adresse@email.com</span>
        </div>
    </footer>
  )
}

export default Footer