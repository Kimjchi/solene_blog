import React, { useEffect, useState } from 'react'
import { useSpring, a } from '@react-spring/web'

interface OpaquePhotoProps {
    imageURL: string;
    title: string;
    location: string;
    date: string;
    index: number;
}

export default function OpaquePhoto ({imageURL, title, location, date, index}: OpaquePhotoProps) {
    const [hovered, setHovered] = useState(true)
    const { opacity } = useSpring({
        opacity: hovered ? 0.6 : 0,
        config: { mass: 5, tension: 500, friction: 80 },
    })

    useEffect(() => {
        setTimeout(()=>{
            setHovered(false)
        }, 250 * (index + 1))    
    }, [])
  return (
    <div className={"flex h-80 items-center justify-center relative" + (index % 3 === 0 ? " ": "")} onMouseLeave={() => setHovered(false)} onMouseEnter={() => setHovered(true)}>
        <a.div className='absolute overflow-hidden shadow-md pb-80 cursor-pointer will-change-transform w-full top-0' style={{ opacity: opacity.to(o => 1 - o) }}>
            <img src={imageURL} alt={title} className="object-top absolute h-80 w-full object-cover shadow-lg rounded-lg" ></img>
        </a.div>   
        <a.div
            className="h-80 w-full shadow-md absolute cursor-pointer will-change-transform yellow top-0 text-center font-finlandica-500 rounded-lg"
            style={{
                opacity,
            }}
        >
            <div className='w-full h-full justify-center items-center flex flex-col select-none'>
                <p className='text-xl px-5 whitespace-pre-wrap'>{title}</p>
                <h4 className='text-xl px-5'>{location}</h4>
                <h4 className=''>{date}</h4>
            </div>
            </a.div>  
    </div>
  )
}
