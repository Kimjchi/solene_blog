import React, { useCallback, useEffect, useState } from 'react'
import Pagination from '../../components/Pagination';
import PostCard from '../../components/PostCard';
import { getSearchedPosts, Post } from '../../services';

const POSTS_DISPLAYED = 4
interface TagPageProps {
    keyword: string;
}

export default function SearchPage({ keyword }: TagPageProps) {
    const [posts, setPosts] = useState<Post[]>([]);
    const [totalPage, setTotalPage] = useState<number>(1);

    // declare the async data fetching function
    const fetchData = useCallback(async (selectedPage: number) => {
      const skip = (selectedPage - 1) * POSTS_DISPLAYED
      const data = await (getSearchedPosts(keyword, skip) || []);
      const posts: Post[] = data.edges.map((edge: any) => edge.node);
      setPosts(posts);
      setTotalPage(Math.ceil(data.aggregate.count / POSTS_DISPLAYED) )
    }, [keyword])

    useEffect(() => {
      fetchData(1)
      // make sure to catch any error
      .catch(console.error);
    }, [fetchData])
    const sortedPosts = posts.sort((a,b) => {
        return a.featuredPost ? (b.featuredPost ? 0 : -1) : 1
      })
      return (
            <div className='h-full w-full'>
              <div className='lg:-mb-8 mt-10'>
                <h2 className='font-finlandica-500'>Results for "{keyword}"</h2>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 w-full gap-4 overflow-hidden h-1/2 mb-8">
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
              <Pagination pageNumber={totalPage} callBack={fetchData}/>
            </div>
      )
}
export async function getServerSideProps({params}: {params: {keyword: string}}) {
  return {
    props: { keyword: params.keyword }
  }
}