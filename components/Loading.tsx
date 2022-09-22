import React from 'react'
import { Trail, animated, useSpring, useSprings } from "react-spring";

const dots = ["dot-1", "dot-2", "dot-3"];

export default function Loading() {

    const [springs, api] = useSprings(
        3, // dots
        i => ({
            loop: true,            
            config: { tension: 200, friction: 5 },
            to: [
                { top: 0 * i, left: (i - 1) * 20 },
                { top: 10, left: (i - 1) * 20 },
              ],
            from: { top: 10, left: (i - 1) * 20 },
            delay: i * 300       
          })
    )

    const styles = useSpring({
        loop: true,
        to: [
          { opacity: 1, color: '#ffaaee' },
          { opacity: 0, color: 'rgb(14,26,19)' },
        ],
        from: { opacity: 0, color: 'red' },
      })

    return (
        <div className='relative mx-auto mt-10 flex'>
            {springs.map((styles: any, index: number) => <animated.div style={styles} className={`absolute w-4 h-4 bg-teal-700 rounded-full`} key={index}/>)}
        </div>
    )
}