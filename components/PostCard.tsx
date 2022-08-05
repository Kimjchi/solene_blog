import React from 'react'
import moment from 'moment';
import Link from 'next/link';

interface postCardProps {
  isFeatured?: boolean;
  image: string;
  excerpt: string;
  date: Date;
  theme: string;
  title: string;
  url: string;
  index: number;
} 

const PostCard = ({isFeatured=false, image, excerpt, date, theme, title, url, index}: postCardProps) => {
  const classes = isFeatured ? "col-span-2" : index === 1 ? "mt-10" : ""
  return (
    <div className={classes + " card shadow-lg rounded-lg p-3 relative bg-white"}>
      <div className='relative overflow-hidden shadow-md pb-80 mb-5'>
        <img src={image} alt={title} className="object-top absolute h-80 w-full object-cover shadow-lg rounded-lg"></img>
      </div>      
      <h4 className='mx-auto transition duration-100 text-center mb-5 cursor-pointer hover:text-violet-900 text-xl font-semibold'>
        <Link href={`/post/${url}`}>{title}</Link>
      </h4>
      <p className='line-clamp-5 overflow-hidden text-center text-sm text-gray-700 font-normal px-4 lg:px-10 h-48 mb-16'>{excerpt}</p>
      <div className='text-center flex justify-between px-2 items-center bottom-2 absolute w-11/12 -translate-x-2/4 left-2/4	'>
        <div className='font-medium text-gray-700 text-sm space-x-1'>
            <span>{moment(date).format('MMM DD, YYYY')}</span>
            <span>{theme}</span>
        </div>
        <Link href={`/post/${url}`}>
          <span className='transition duration-500 transform hover:-translate-y-1 inline-block purple text-sm font-medium rounded-full text-white px-8 py-3 cursor-pointer'>
            Continue Reading
          </span>
        </Link>
        <div className='text-sm space-x-1'>
          <span>Tag 1</span>
          <span>Tag 2</span>
          <span>Tag 3</span>
        </div>
      </div>
    </div>
  )
}

export default PostCard