import React, { useState } from 'react'
import { useSpring, a } from '@react-spring/web'
import { platform } from 'os';

interface FlippingCardProps {
    imageURL: string;
    title: string;
    platform: string;
    numberOfSubtitles: number;
}

export default function FlippingCard ({imageURL, title, numberOfSubtitles, platform}: FlippingCardProps) {
    const [flipped, setFlipped] = useState(false)
    const { transform, opacity } = useSpring({
        opacity: flipped ? 1 : 0,
        transform: `perspective(600px) rotateX(${flipped ? 180 : 0}deg)`,
        config: { mass: 5, tension: 500, friction: 80 },
    })
  return (
    <div className="flex h-full items-center justify-center relative" onClick={() => setFlipped(state => !state)}>
        <a.div className='absolute overflow-hidden shadow-md pb-80 mb-5 cursor-pointer will-change-transform w-full top-0' style={{ opacity: opacity.to(o => 1 - o), transform }}>
            <img src={imageURL} alt={title} className="object-top absolute h-80 w-full object-cover shadow-lg rounded-lg" ></img>
        </a.div>   
        <a.div
            className="h-80 w-full shadow-md absolute cursor-pointer will-change-transform green top-0 text-center py-20 font-finlandica-500 rounded-lg"
            style={{
                opacity,
                transform,
                rotateX: '180deg',
            }}
        >
            <h4 className='text-xl'>{title}</h4>
            <h4 className=''>{platform}</h4>
            <h4 className=''>{numberOfSubtitles} sous-titres</h4>
            </a.div>  
    </div>
  )
}
