import React, { useCallback, useEffect, useState } from 'react'
import Loading from '../components/atoms/Loading';
import Pagination from '../components/Pagination';
import PostCard from '../components/PostCard';
import { getCategoryPosts, Post } from '../services';

const POSTS_DISPLAYED = 6
interface CategoryPageProps {
    category: string;
  }

  export default function CategoryPage({ category }: CategoryPageProps) {
    const [posts, setPosts] = useState<Post[]>([]);
    const [totalPage, setTotalPage] = useState<number>(1);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    // declare the async data fetching function
    const fetchData = useCallback(async (selectedPage: number) => {
      setIsLoading(true);
      const skip = (selectedPage - 1) * POSTS_DISPLAYED
      const postsConnection = await (getCategoryPosts({category, skip}) || []);
      const posts: Post[] = postsConnection.edges.map((edge: any) => edge.node);
      setPosts(posts);
      setTotalPage(Math.ceil(postsConnection.aggregate.count / POSTS_DISPLAYED))
      setIsLoading(false)
    }, [category])

    useEffect(() => {
      fetchData(1)
      // make sure to catch any error
      .catch(console.error);
    }, [fetchData])
    
      return (
          <div className='w-full h-full -mt-12 pt-12 flex flex-col'>
            {
            isLoading && <Loading />
            }
            <div className="grid grid-cols-1 lg:grid-cols-3 w-full gap-4 overflow-hidden h-1/2 mb-8 -mt-8 pt-10">
                {!isLoading && posts.map((post, index) => {
                  return (
                    <PostCard 
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
            {posts.length > 0 && <Pagination pageNumber={totalPage} callBack={fetchData} category={category}/>}
            {!isLoading && posts.length === 0 && <h2 className='text-xl font-finlandica-500'>De prochains articles seront bientôt disponibles !</h2>}
          </div>
      )
}

export async function getServerSideProps({params}: {params: {category: string}}) {
  
    return {
      props: { category: params.category }
    }
}