import React from 'react'
import PostCard from '../../components/PostCard';
import { getSearchedPosts, Post } from '../../services';

interface TagPageProps {
    posts: Post[];
    keyword: string;
}

export default function SearchPage({ posts, keyword }: TagPageProps) {
    const sortedPosts = posts.sort((a,b) => {
        return a.featuredPost ? (b.featuredPost ? 0 : -1) : 1
      })
      return (
            <div className='h-full w-full'>
              <div className='lg:-mb-8 mt-10'>
                <h2 className='font-finlandica-500'>Results for "{keyword}"</h2>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 lg:w-5/6 w-full gap-4 overflow-hidden h-1/2">
                  {sortedPosts.map((post, index) => {
                    return (
                      <PostCard 
                        title={post.title} 
                        theme={post.category?.name} 
                        image={post.featuredImage.url} 
                        excerpt={post.excerpt} 
                        date={new Date(post.publishedAt)}
                        key={post.id}
                        url={post.slug}
                        index={index + 1}
                        tags={post.tags.map(({name}: any) => name)}
                      />
                  )})}
              </div>
            </div>
      )
}

export async function getServerSideProps({params}: {params: {keyword: string}}) {
    const posts = (await getSearchedPosts(params.keyword) || []); 
    return {
      props: { posts, keyword: params.keyword }
    }
}