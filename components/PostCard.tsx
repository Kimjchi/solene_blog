import React from 'react'
import moment from 'moment';
import Link from 'next/link';
import { useSpring, animated } from 'react-spring'

interface postCardProps {
  isFeatured?: boolean;
  image: string;
  excerpt: string;
  date: Date;
  theme: string;
  title: string;
  url: string;
  index: number;
  tags: string[];
} 

const PostCard = ({isFeatured=false, image, excerpt, date, theme, title, url, index, tags}: postCardProps) => {
  const classes = isFeatured ? "lg:col-span-2" : index === 1 ? "lg:mt-10" : ""
  const props: any = useSpring({ to: { opacity: 1, top: "0" }, from: { opacity: 0, top: "100vh" }, delay: 250 })

  return (
    <animated.div className={classes + " shadow-lg p-3 relative bg-white w-full" + ( index % 2 === 0 ? " card" : " text-center green-border")} style={props}>
      <div className='text-left mb-2'>
        <h4 className='transition duration-100 cursor-pointer hover:text-violet-900 text-xl font-finlandica-500'>
          <Link href={`/post/${url}`}>{title}</Link>
        </h4>
        <span className='text-gray-700 space-x-1 font-finlandica italic'>{theme}</span>
      </div>
      <div className='relative overflow-hidden shadow-md pb-80 mb-5'>
        <img src={image} alt={title} className="object-top absolute h-80 w-full object-cover shadow-lg rounded-lg"></img>
      </div>      
      <p className='line-clamp-5 overflow-hidden text-center text-gray-700 font-normal px-4 lg:px-10 h-48 mb-16'>{excerpt}</p>
      <div className='text-center flex flex-col px-2 items-center bottom-2 absolute w-11/12 -translate-x-2/4 left-2/4'>
        <div>
          <Link href={`/post/${url}`}>
            <span className='transition duration-500 transform hover:-translate-y-1 inline-block green px-6 py-2 cursor-pointer'>
              Continue Reading
            </span>
          </Link>
        </div>
        <div className='flex justify-between w-full'>
          <span className='text-gray-700 space-x-1'>
            {moment(date).format('MMM DD, YYYY')}
          </span>
          <div className='space-x-1'>
            {
              tags.map((tag, index) => (<span key={index}>{tag}</span>))
            }
          </div>
        </div>
      </div>
    </animated.div>
  )
}

export default PostCard