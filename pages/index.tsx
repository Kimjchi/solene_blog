import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import NavigationBar from '../components/NavigationBar'
import PostCard from '../components/PostCard'

const posts = [
  {title: 'React Testing', excerpt: 'Learn React Testing', featured: true, date: ''},
  {title: 'React with Tailwind', excerpt: 'Learn React with Tailwind',  featured: false, date: ''},
  {title: 'React with Tailwind', excerpt: 'Learn React with Tailwind',  featured: false, date: ''},
  {title: 'React with Tailwind', excerpt: 'Learn React with Tailwind',  featured: false, date: ''},
  {title: 'React with Tailwind', excerpt: 'Learn React with Tailwind',  featured: false, date: ''},
  {title: 'React with Tailwind', excerpt: 'Learn React with Tailwind',  featured: false, date: ''},
  {title: 'React with Tailwind', excerpt: 'Learn React with Tailwind',  featured: false, date: ''},
  {title: 'React with Tailwind', excerpt: 'Learn React with Tailwind',  featured: false, date: ''},
  {title: 'React with Tailwind', excerpt: 'Learn React with Tailwind',  featured: false, date: ''},
  {title: 'React with Tailwind', excerpt: 'Learn React with Tailwind',  featured: false, date: ''},
  {title: 'React with Tailwind', excerpt: 'Learn React with Tailwind',  featured: false, date: ''},
  {title: 'React with Tailwind', excerpt: 'Learn React with Tailwind',  featured: false, date: ''},
  {title: 'React with Tailwind', excerpt: 'Learn React with Tailwind',  featured: false, date: ''},
  {title: 'React with Tailwind', excerpt: 'Learn React with Tailwind',  featured: false, date: ''},
  {title: 'React with Tailwind', excerpt: 'Learn React with Tailwind',  featured: false, date: ''},
  {title: 'React with Tailwind', excerpt: 'Learn React with Tailwind',  featured: false, date: ''},
  {title: 'React with Tailwind', excerpt: 'Learn React with Tailwind',  featured: false, date: ''},
  {title: 'React with Tailwind', excerpt: 'Learn React with Tailwind',  featured: false, date: ''},
  {title: 'React with Tailwind', excerpt: 'Learn React with Tailwind',  featured: false, date: ''},
  {title: 'React with Tailwind', excerpt: 'Learn React with Tailwind',  featured: false, date: ''},
  {title: 'React with Tailwind', excerpt: 'Learn React with Tailwind',  featured: false, date: ''},
  {title: 'React with Tailwind', excerpt: 'Learn React with Tailwind',  featured: false, date: ''},
  {title: 'React with Tailwind', excerpt: 'Learn React with Tailwind',  featured: false, date: ''},
  {title: 'React with Tailwind', excerpt: 'Learn React with Tailwind',  featured: false, date: ''},
  {title: 'React with Tailwind', excerpt: 'Learn React with Tailwind',  featured: false, date: ''},
  {title: 'React with Tailwind', excerpt: 'Learn React with Tailwind',  featured: false, date: ''},
  {title: 'React with Tailwind', excerpt: 'Learn React with Tailwind',  featured: false, date: ''},
  {title: 'React with Tailwind', excerpt: 'Learn React with Tailwind',  featured: false, date: ''},
  {title: 'React with Tailwind', excerpt: 'Learn React with Tailwind',  featured: false, date: ''},
  {title: 'React with Tailwind', excerpt: 'Learn React with Tailwind',  featured: false, date: ''},
  {title: 'React with Tailwind', excerpt: 'Learn React with Tailwind',  featured: false, date: ''},
  {title: 'React with Tailwind', excerpt: 'Learn React with Tailwind',  featured: false, date: ''},
  {title: 'React with Tailwind', excerpt: 'Learn React with Tailwind',  featured: false, date: ''},
]

export default function Home() {
  // TODO sort posts to have featured at first position
  return (
    <div className="container mx-auto p-5 mb-8 h-full">
      <NavigationBar />
      <div className='banner w-full bg-yellow-400 flex flex-col h-40 content-center'>
        <h1 className='m-auto mb-1 text-6xl'>Solene's Blog</h1>
        <h6 className='m-auto mt-1'>On essaye un nouveau blog !</h6>
      </div>
      <div className='main flex w-full my-2 h-1/2 space-x-4'>
        <div className='left-side flex flex-col w-1/6 space-y-2'>
          <div className='introduction card w-full h-1/3'>
            <img></img>
            <h4 className='mx-auto'>Introduction</h4>
            <p className='text-sm mx-auto'>
            Mauris fringilla placerat condimentum. Etiam non nunc at dolor sodales pulvinar. Sed sit amet turpis eu lacus commodo euismod vitae sed sem. Nullam ut dapibus metus, et sagittis leo. Proin vel nisi ut turpis lobortis laoreet at eget tortor. Aliquam in ornare sapien, quis pellentesque nunc.
            </p>
          </div>
          <div className='search card w-full h-2/3'>
          <h4 className='mx-auto'>RECHERCHE</h4>
          <h4 className='mx-auto'>MOTS CLES</h4>
          </div>
        </div>
        <div className="grid grid-cols-3 w-5/6 gap-4">
            {posts.map((post) => {
              return (
                <PostCard 
                  isFeatured={post.featured} 
                  title={post.title} 
                  theme="" 
                  image='' 
                  excerpt={post.excerpt} 
                  date={new Date(post.date)}
                />
              
            )})}
        </div>
      
      </div>
      <footer className="flex h-10 w-full items-center justify-center border-t">
          Powered by{' Jeremy\'s dumb imagination'}
      </footer>
    </div>
  )
}
