import React from 'react'

interface postCardProps {
  isFeatured?: boolean;
  image: string;
  excerpt: string;
  date: Date;
  theme: string;
  title: string;
} 

const PostCard = ({isFeatured=false, image, excerpt, date, theme, title}: postCardProps) => {
  const classes = isFeatured ? "col-span-2" : ""
  return (
    <div className={classes + " card"}>
      <img></img>
      <h4 className='mx-auto'>{title}</h4>
      <p className='text-sm mx-auto'>
      {excerpt}
      </p>
    </div>
  )
}

export default PostCard