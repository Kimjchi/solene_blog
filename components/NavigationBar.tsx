import React, {useContext, useEffect, useState} from 'react'

import Link from 'next/link'

import { getCategories } from '../services'

const NavigationBar = () => {
    const [categories, setCategories] = useState<any>([])
    useEffect(() => {
      getCategories().then((newCategories:any) => setCategories([{name: "Accueil", slug: "/"}, ...newCategories]))
    }, [])

  return (
    <div className='container mx-auto flex w-full justify-between pt-8'>{categories.map((category: any) => (<Link href={category.slug} key={category.slug}><span className='cursor-pointer font-bold'>{category.name}</span></Link>))}</div>
  )
}

export default NavigationBar