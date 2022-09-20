import { useCallback, useEffect, useState } from 'react';
import Pagination from '../components/Pagination';
import PostCard from '../components/PostCard'
import { getPosts, Post } from '../services'

const POSTS_DISPLAYED = 5;

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([]);
    const [totalPage, setTotalPage] = useState<number>(1);

    // declare the async data fetching function
    const fetchData = useCallback(async (selectedPage: number) => {
      const first = selectedPage === 1 ? 4 : 6
      const skip = (selectedPage - 1) * (selectedPage === 2 ? 4 : 6)      
      const {postsConnection, featuredPosts} = await (getPosts({skip, first}) || []);
      const posts: Post[] = postsConnection.edges.map((edge: any) => edge.node);
      if (skip === 0 && featuredPosts.length > 0) setPosts([...posts, featuredPosts[0]]);
      else setPosts(posts);
      setTotalPage(Math.ceil(postsConnection.aggregate.count / POSTS_DISPLAYED) )
    }, [])

    useEffect(() => {
      fetchData(1)
      // make sure to catch any error
      .catch(console.error);
    }, [fetchData])

  const sortedPosts = posts.sort((a,b) => {
    return a.featuredPost ? (b.featuredPost ? 0 : -1) : 1
  })

  return (
        <div className='w-full h-full -mt-12 pt-12'>
          <div className="grid grid-cols-1 lg:grid-cols-3 w-full gap-4 overflow-hidden h-1/2 mb-8 -mt-8 pt-10">
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
                    tags={post.tags.map(({name}) => name)}
                  />
              )})}            
          </div>
          <Pagination pageNumber={totalPage} callBack={fetchData}/>
        </div>
  )
}