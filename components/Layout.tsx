import React from 'react'
import { getTags, Tag } from '../services';
import Footer from './Footer';
import NavigationBar from './NavigationBar'
import SearchCard from './SearchCard';

interface LayoutProps {
    children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <>
        <NavigationBar />        
        <div className="container mx-auto p-5 mb-8 h-full">
            <div className='banner w-full bg-yellow-400 flex flex-col h-48 content-center'>
                <h1 className='m-auto mb-1 md:text-6xl text-3xl font-bold'>Solene's Blog</h1>
                <h6 className='m-auto mt-1'>On essaye un nouveau blog !</h6>
            </div>
            <div className='main flex w-full my-2 h-1/2 md:space-x-4 -mt-8'>
                <div className='left-side flex-col w-1/6 space-y-2 mt-10 md:flex hidden'>
                    <div className='introduction card w-full shadow-lg py-1'>
                        <div className='relative overflow-hidden pb-52 mb-4'>
                            <img src='https://media.graphassets.com/XpgYvvEoQ0etvlPK2pPU' alt='Une photo de Solene' className="object-top absolute h-52 w-full object-contain rounded-lg"></img>
                        </div>
                        <h4 className='mx-auto font-semibold'>Introduction</h4>
                        <p className='text-sm mx-auto text-center px-2'>
                        Mauris fringilla placerat condimentum. Etiam non nunc at dolor sodales pulvinar. Sed sit amet turpis eu lacus commodo euismod vitae sed sem. Nullam ut dapibus metus, et sagittis leo. Proin vel nisi ut turpis lobortis laoreet at eget tortor.
                        </p>
                    </div>
                    <SearchCard />
                </div>
                {children}
                </div>
            </div>
        <div className='px-5 container mx-auto'><Footer /></div>
    </>
  )
}

export default Layout