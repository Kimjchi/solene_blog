import React from 'react'
import CommentForm from '../../components/CommentForm';
import PostDetail from '../../components/PostDetail';
import SimilarArticles from '../../components/SimilarArticles';

import { category, getPostDetails, getPosts, getSimilarPosts, lightPost } from '../../services'

interface PostDetailsProps {
    id: string;
    featuredPost: boolean;
    featuredImage: any;
    title: string;
    excerpt: string;
    slug: string;
    publishedAt: string;
    category: category;
    content: any
    author: any
}

export default function PostDetails({post, lightPosts}: {post: PostDetailsProps, lightPosts: lightPost[]}) {
  return (
    <div className='flex flex-col w-full'>
        <PostDetail
            title={post.title} 
            theme={post.category?.name} 
            image={post.featuredImage.url} 
            content={post.content?.raw} 
            date={new Date(post.publishedAt)}
            author={post.author?.name}
        />
        <SimilarArticles lightPosts={lightPosts} />
        <CommentForm postID={post.id} />
    </div>
  )
}

export async function getStaticProps({params}: {params: {slug: string}}) {
    const post = await getPostDetails(params.slug);
    const lightPosts = await getSimilarPosts(post?.category?.name, params.slug);
    return {
      props: { post, lightPosts }
    }
}

export async function getStaticPaths() {
    const posts = await getPosts();
    return {
        paths: posts.map(({slug}: any) => ({params: {slug: slug || ''}})),
        fallback: false
    }
}