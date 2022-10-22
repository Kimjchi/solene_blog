import Link from 'next/link'
import React from 'react'

const Footer = () => {
  return (
    <footer className="flex h-full w-full footer px-16 pt-4 pb-8 justify-around text-center mb-4 md:flex-row flex-col rounded-lg">
        <div className='flex flex-col'>
            <span className='font-finlandica-500'>Navigation</span>
            <span><Link href={`/archives`}>Historique des articles</Link></span>
        </div>
        <div className='flex flex-col'>
            <span className='font-finlandica-500'>À propos</span>
            <span>Copyright 2022</span>
            <span><Link href={`/mentions-legales`}>Mentions légales</Link></span>
        </div>
        <div className='flex flex-col'>
            <span className='font-finlandica-500'>Contact</span>
            <span><a href="mailto:contact@obangsaek.fr" target="_blank">contact@obangsaek.fr</a></span>
        </div>
    </footer>
  )
}

export default Footer