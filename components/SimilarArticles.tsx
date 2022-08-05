import moment from 'moment';
import React from 'react'
import { lightPost } from '../services';

interface SimilarArticlesProps {
    lightPosts: lightPost[];
}

export default function SimilarArticles({lightPosts}: SimilarArticlesProps) {
  return (
    <div className='w-full mt-3'>
        <h3 className='ml-5'>Ces articles devraient vous plaire</h3>
        <div className='card flex flex-row h-72 shadow-lg rounded-lg p-3 relative bg-white'>
            {
                lightPosts.map(post => (
                    <div key={post.id} className='flex flex-col h-full'>
                        <div className='relative overflow-hidden shadow-md pb-52 mb-3 w-1/4'>
                            <img src={post.featuredImage?.url} alt={post.title} className="object-top absolute h-52 w-full object-cover shadow-lg rounded-lg"></img>
                        </div>
                        <h4 className='mb-1 text-sm'>{post.title}</h4>
                        <h4 className='mb-1 text-sm'>{moment(post.publishedAt).format('MMM DD, YYYY') + " " + (post?.category?.name || '') }</h4>
                    </div>
                ))
            }
        </div>
    </div>
  )
}

