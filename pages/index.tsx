import { useCallback, useEffect, useState } from 'react';
import Loading from '../components/Loading';
import Pagination from '../components/Pagination';
import PostCard from '../components/PostCard'
import { getPosts, Post } from '../services'

const POSTS_DISPLAYED = 5;

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([]);
    const [totalPage, setTotalPage] = useState<number>(1);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    // declare the async data fetching function
    const fetchData = useCallback(async (selectedPage: number) => {
      setIsLoading(true)
      const first = selectedPage === 1 ? 4 : 6
      const skip = (selectedPage === 1 ? 0 : selectedPage === 2 ? 4 : (6 * (selectedPage - 2) + 4))    
      const {postsConnection, featuredPosts} = await (getPosts({skip, first}) || []);
      const posts: Post[] = postsConnection.edges.map((edge: any) => edge.node);
      if (skip === 0 && featuredPosts.length > 0) setPosts([...posts, featuredPosts[0]]);
      else setPosts(posts);
      setTotalPage(Math.floor((postsConnection.aggregate.count + (featuredPosts.length > 0 ? 1 : 0)) / POSTS_DISPLAYED) + 1)
      setIsLoading(false)
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
        <div className='w-full h-full -mt-12 pt-12 flex flex-col'>
          {
            isLoading && <Loading />
          }
          <div className="grid grid-cols-1 lg:grid-cols-3 w-full gap-4 overflow-hidden h-1/2 mb-8 -mt-8 pt-10">
              {!isLoading && sortedPosts.map((post, index) => {
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
          {posts.length > 0 && <Pagination pageNumber={totalPage} callBack={fetchData}/>}
        </div>
  )
}