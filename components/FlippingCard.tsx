import React, { useState } from 'react'
import { useSpring, a } from '@react-spring/web'

interface FlippingCardProps {
    imageURL: string;
    title: string;
    platform: string;
    numberOfSubtitles: number;
    genres: string[];
    koreanName: string;
    index: number;
}

export default function FlippingCard ({imageURL, title, numberOfSubtitles, platform, genres, koreanName, index}: FlippingCardProps) {
    const [flipped, setFlipped] = useState(false)
    const { transform, opacity } = useSpring({
        opacity: flipped ? 1 : 0,
        transform: `perspective(600px) rotateX(${flipped ? 180 : 0}deg)`,
        config: { mass: 5, tension: 500, friction: 80 },
    })
  return (
    <div className={"flex h-64 items-center justify-center relative" + (index % 3 === 0 ? " col-start-1": "")} onClick={() => setFlipped(state => !state)}>
        <a.div className='absolute overflow-hidden shadow-md pb-64 mb-5 cursor-pointer will-change-transform w-full top-0' style={{ opacity: opacity.to(o => 1 - o), transform }}>
            <img src={imageURL} alt={title} className="object-top absolute h-64 w-full object-cover shadow-lg rounded-lg" ></img>
        </a.div>   
        <a.div
            className="h-64 w-full shadow-md absolute cursor-pointer will-change-transform green top-0 text-center font-finlandica-500 rounded-lg"
            style={{
                opacity,
                transform,
                rotateX: '180deg',
            }}
        >
            <div className='w-full h-full justify-center items-center flex flex-col'>
                <p className='text-xl px-5'>{title}</p>
                <h4 className='text-xl px-5'>{koreanName}</h4>
                <h4 className='px-5 italic'>{genres.join(", ")}</h4>
                <h4 className=''>{platform}</h4>
                <h4 className=''>{numberOfSubtitles} sous-titres</h4>
            </div>
            </a.div>  
    </div>
  )
}
