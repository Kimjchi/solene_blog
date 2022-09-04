import React from 'react'
import PostCard from '../../components/PostCard';
import { getTags, Post, getTagPosts } from '../../services';

interface TagPageProps {
    posts: Post[];
    slug: string;
  }

export default function TagPage({ posts, slug }: TagPageProps) {
    const sortedPosts = posts.sort((a,b) => {
        return a.featuredPost ? (b.featuredPost ? 0 : -1) : 1
      })
      // TODO Remove accueil and use the previous category used? Need to filter get tag posts as well then
      return (
            <div className='h-full w-full'>
              <div className='lg:-mb-8 mt-10'>
                <h2 className='font-bold'>Articles #{slug}#</h2>
                <h3>Accueil {'>'} #{slug}#</h3> 
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

export async function getStaticProps({params}: {params: {slug: string}}) {
    const posts = (await getTagPosts(params.slug) || []); // TODO get posts with tags
  
    return {
      props: { posts, slug: params.slug }
    }
}

export async function getStaticPaths() {
    const tags = await getTags();
    return {
        paths: tags.map(({slug}: any) => ({params: {slug: slug || ''}})),
        fallback: false
    }
}