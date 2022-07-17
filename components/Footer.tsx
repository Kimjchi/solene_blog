import Link from 'next/link'
import React from 'react'

const Footer = () => {
  return (
    <footer className="flex flex-col h-full w-full items-center justify-center footer px-16 py-10 space-y-10">
        Powered by{' Jeremy\'s dumb imagination'}
        <div className='flex justify-between w-full'>
            <span>Historique des articles</span>
            <div>
                <span></span>
                <span>adresse@email.com</span>
            </div>
        </div>
        <div className='border-t flex justify-around w-full px-10 py-5'>
            <div className='flex space-x-5'>
                <span>Copyright 2022</span>
                <span>Mentions légales</span>
            </div>
            <div className='flex space-x-1 text-center'>
                <div className='bg-gray-400 rounded-full w-8 h-8'>P</div>
                <div className='bg-gray-400 rounded-full w-8 h-8'>L</div>
                <div className='bg-gray-400 rounded-full w-8 h-8'>I</div>
            </div>
        </div>
    </footer>
  )
}

export default Footer