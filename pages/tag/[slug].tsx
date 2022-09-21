import React, { useCallback, useEffect, useState } from 'react'
import Pagination from '../../components/Pagination';
import PostCard from '../../components/PostCard';
import { getTags, Post, getTagPosts } from '../../services';

const POSTS_DISPLAYED = 6;
interface TagPageProps {
    slug: string;
}

export default function TagPage({ slug }: TagPageProps) {
    const [posts, setPosts] = useState<Post[]>([]);
    const [totalPage, setTotalPage] = useState<number>(1);

    // declare the async data fetching function
    const fetchData = useCallback(async (selectedPage: number) => {
      const skip = (selectedPage - 1) * POSTS_DISPLAYED
      const data = await (getTagPosts(slug, skip) || []);
      const posts: Post[] = data.edges.map((edge: any) => edge.node);
      setPosts(posts);
      setTotalPage(Math.ceil(data.aggregate.count / POSTS_DISPLAYED) )
    }, [slug])

    useEffect(() => {
      fetchData(1)
      // make sure to catch any error
      .catch(console.error);
    }, [fetchData])

    const sortedPosts = posts.sort((a,b) => {
        return a.featuredPost ? (b.featuredPost ? 0 : -1) : 1
      })
      return (
            <div className='h-full w-full pl-5'>
              <div className='my-4'>
                <h2 className='font-finlandica-500 text-xl'>Articles #{slug}#</h2>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-3 w-full gap-4 overflow-hidden h-1/2 mb-8">
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
              {posts.length > 0 && <Pagination pageNumber={totalPage} callBack={fetchData}/>}
            </div>
      )
}

export async function getStaticProps({params}: {params: {slug: string}}) {
    return {
      props: { slug: params.slug }
    }
}

export async function getStaticPaths() {
    const tags = await getTags();
    return {
        paths: tags.map(({slug}: any) => ({params: {slug: slug || ''}})),
        fallback: false
    }
}