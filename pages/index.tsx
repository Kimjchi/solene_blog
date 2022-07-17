import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import PostCard from '../components/PostCard'
import { getPosts, Post } from '../services'

interface HomeProps {
  posts: Post[];
}


export default function Home( { posts }: HomeProps) {
  const sortedPosts = posts.sort((a,b) => {
    return a.featuredPost ? (b.featuredPost ? 0 : -1) : 1
  })

  return (
    <div className="container mx-auto p-5 mb-8 h-full">
      <div className='banner w-full bg-yellow-400 flex flex-col h-40 content-center'>
        <h1 className='m-auto mb-1 text-6xl'>Solene's Blog</h1>
        <h6 className='m-auto mt-1'>On essaye un nouveau blog !</h6>
      </div>
      <div className='main flex w-full my-2 h-1/2 space-x-4'>
        <div className='left-side flex flex-col w-1/6 space-y-2'>
          <div className='introduction card w-full h-1/3 shadow-lg rounded-lg py-1'>
            <div className='relative overflow-hidden pb-52 mb-4'>
              <img src='https://media.graphassets.com/XpgYvvEoQ0etvlPK2pPU' alt='Une photo de Solene' className="object-top absolute h-52 w-full object-contain rounded-lg"></img>
            </div>
            <h4 className='mx-auto font-semibold'>Introduction</h4>
            <p className='text-sm mx-auto text-center px-2'>
            Mauris fringilla placerat condimentum. Etiam non nunc at dolor sodales pulvinar. Sed sit amet turpis eu lacus commodo euismod vitae sed sem. Nullam ut dapibus metus, et sagittis leo. Proin vel nisi ut turpis lobortis laoreet at eget tortor.
            </p>
          </div>
          <div className='search card w-full h-2/3 shadow-lg rounded-lg'>
          <h4 className='mx-auto'>RECHERCHE</h4>
          <h4 className='mx-auto'>MOTS CLES</h4>
          </div>
        </div>
        <div className="grid grid-cols-3 w-5/6 gap-4 overflow-hidden h-1/2">
            {sortedPosts.map((post) => {
              return (
                <PostCard 
                  isFeatured={post.featuredPost} 
                  title={post.title} 
                  theme={post.category.name} 
                  image={post.featuredImage.url} 
                  excerpt={post.excerpt} 
                  date={new Date(post.publishedAt)}
                  key={post.id}
                  url={post.slug}
                />
              
            )})}
        </div>
      
      </div>
    </div>
  )
}

export async function getStaticProps() {
  const posts = (await getPosts() || []);

  return {
    props: { posts }
  }
}