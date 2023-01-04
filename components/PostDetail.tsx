import moment from 'moment';
import React from 'react'
import { Tag } from '../services';

interface postDetailProps {
    image: string;
    content: any;
    date: Date;
    theme: string;
    title: string;
    author?: string;
    tags: Tag[];
} 

export default function PostDetail({
    image,
    content,
    date,
    theme,
    title,
    author='Anonymous',
    tags=[]
}: postDetailProps) {
    const getContentFragment = (index: number, text: any, obj: any, type = '', className='') => {
        let modifiedText = text;
    
        if (obj) {
          if (obj.bold) {
            modifiedText = (<b key={index}>{text}</b>);
          }
    
          if (obj.italic) {
            modifiedText = (<em key={index}>{text}</em>);
          }
    
          if (obj.underline) {
            modifiedText = (<u key={index}>{text}</u>);
          }
        }
    
        switch (type) {
          case 'heading-three':
            return <h3 key={index} className={`text-xl font-semibold mb-4 ${className}`}>{modifiedText.map((item:any, i: number) => <React.Fragment key={i}>{item}</React.Fragment>)}</h3>;
          case 'paragraph':
            return <p key={index} className={`${className.includes("mb-") ? "" : "mb-8"} text-lg ${className}`}>{modifiedText.map((item: any, i:number) => <React.Fragment key={i}>{item}</React.Fragment>)}</p>;
          case 'heading-four':
            return <h4 key={index} className={`text-md font-semibold mb-4 ${className}`}>{modifiedText.map((item: any, i: number) => <React.Fragment key={i}>{item}</React.Fragment>)}</h4>;
          case 'class':
            return obj.children.map((typeObj: any, index: any) => {
              const children2 = typeObj.children.map((item: any, itemIndex: any) => getContentFragment(itemIndex, item.text, item));
              return getContentFragment(index, children2, typeObj, typeObj.type, obj.className)
          })
          case 'image':
            return (
              <img
                className='mx-auto'
                key={index}
                alt={obj.title}
                height={obj.height}
                width={obj.width}
                src={obj.src}
              />
            );
          default:
            return modifiedText;
        }
      };

  return (
    <div className='post-detail yellow-border shadow-lg rounded-lg p-3 relative bg-white w-full'>
        <h4 className='mb-1 text-2xl font-finlandica-500'>{title}</h4>
        <div className='sub-titles divide-x space-x-2 font-finlandica italic mb-5'>
            {theme && <span>{theme}</span>}
            <span className={`${theme ? 'pl-2': ''}`}>{moment(date).format('MMM DD, YYYY')}</span>
            <span className='pl-2'>{author}</span>
            {tags.slice(0, 3).map((tag, index) => <span className='pl-2' key={index}>{tag.name}</span>)}
        </div>
        <img src={image} alt={title} className="h-96 object-contain object-center rounded-lg overflow-hidden mb-5 max-w-5/6 mx-auto"></img>
        <div className='line-clamp-5 overflow-hidden text-justify text-gray-700 px-4 lg:px-10 mb-8 select-none'>{
            content?.children.map((typeObj: any, index: any) => {
                const children = typeObj.children.map((item: any, itemIndex: any) => getContentFragment(itemIndex, item.text, item));
                return getContentFragment(index, children, typeObj, typeObj.type)
            })
        }</div>
    </div>
  )
}