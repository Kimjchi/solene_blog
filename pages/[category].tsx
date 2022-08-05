import React from 'react'
import PostCard from '../components/PostCard';
import { getCategories, getCategoryPosts, Post } from '../services';

interface HomeProps {
    posts: Post[];
  }

  export default function CategoryPage({ posts }: HomeProps) {
    const sortedPosts = posts.sort((a,b) => {
        return a.featuredPost ? (b.featuredPost ? 0 : -1) : 1
      })
    
      return (
            <div className="grid grid-cols-1 lg:grid-cols-3 lg:w-5/6 w-full gap-4 overflow-hidden h-1/2">
                {sortedPosts.map((post, index) => {
                  return (
                    <PostCard 
                      isFeatured={post.featuredPost} 
                      title={post.title} 
                      theme={post.category?.name} 
                      image={post.featuredImage.url} 
                      excerpt={post.excerpt} 
                      date={new Date(post.publishedAt)}
                      key={post.id}
                      url={post.slug}
                      index={index}
                    />
                )})}
            </div>
      )
}

export async function getStaticProps({params}: {params: {category: string}}) {
    const posts = (await getCategoryPosts(params.category) || []);
  
    return {
      props: { posts }
    }
}

export async function getStaticPaths() {
    const categories = await getCategories();
    return {
        paths: categories.map(({slug}: any) => ({params: {category: slug || ''}})),
        fallback: false
    }
}