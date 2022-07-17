import React, {useContext} from 'react'

import Link from 'next/link'

const NavigationBar = () => {
    const categories = [
        {title: "Accueil", url: "/home"},
        {title: "Litterature", url: "/litterature"},
        {title: "Cinema", url: "/cinema"},
        {title: "Arts et histoire", url: "/art-and-history"},
        {title: "Expos et evenements", url: "/exhibitions-and-events"},
        {title: "Carnets de voyage", url: "/travels"},
        {title: "A propos", url: "/about"},
    ]

  return (
    <div className='container mx-auto flex w-full justify-between pt-8'>{categories.map(category => (<Link href={category.url} key={category.url}><span className='cursor-pointer font-bold'>{category.title}</span></Link>))}</div>
  )
}

export default NavigationBar