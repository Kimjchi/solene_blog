import React from 'react'

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
    <div className='flex w-full justify-between'>{categories.map(category => (<span>{category.title}</span>))}</div>
  )
}

export default NavigationBar