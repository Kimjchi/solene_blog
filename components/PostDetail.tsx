import moment from 'moment';
import React from 'react'

interface postDetailProps {
    image: string;
    content: any;
    date: Date;
    theme: string;
    title: string;
    author?: string;
} 

export default function PostDetail({
    image,
    content,
    date,
    theme,
    title,
    author='Anonymous'
}: postDetailProps) {
    const getContentFragment = (index: number, text: any, obj: any, type = '') => {
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
            return <h3 key={index} className="text-xl font-semibold mb-4">{modifiedText.map((item:any, i: number) => <React.Fragment key={i}>{item}</React.Fragment>)}</h3>;
          case 'paragraph':
            return <p key={index} className="mb-8">{modifiedText.map((item: any, i:number) => <React.Fragment key={i}>{item}</React.Fragment>)}</p>;
          case 'heading-four':
            return <h4 key={index} className="text-md font-semibold mb-4">{modifiedText.map((item: any, i: number) => <React.Fragment key={i}>{item}</React.Fragment>)}</h4>;
          case 'image':
            return (
              <img
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
    <div className='post-detail card shadow-lg rounded-lg p-3 relative bg-white mt-10 w-full min-h-screen'>
        <h4 className='mb-3 text-2xl'>{title}</h4>
        <div className='sub-titles divide-x space-x-2 text-sm'>
            {theme && <span>{theme}</span>}
            <span className={`${theme ? 'pl-2': ''}`}>{moment(date).format('MMM DD, YYYY')}</span>
            <span className='pl-2'>{author}</span>
            <span className='pl-2'>Nombre de commentaires</span>
        </div>
        <div className='relative overflow-hidden shadow-md pb-96 mb-5'>
            <img src={image} alt={title} className="object-top absolute h-96 w-full object-cover shadow-lg rounded-lg"></img>
        </div>
        <div className='line-clamp-5 overflow-hidden text-center text-sm text-gray-700 font-normal px-4 lg:px-10 h-48 mb-16'>{
            content.children.map((typeObj: any, index: any) => {
                const children = typeObj.children.map((item: any, itemIndex: any) => getContentFragment(itemIndex, item.text, item));
                return getContentFragment(index, children, typeObj, typeObj.type)
            })
        }</div>
    </div>
  )
}