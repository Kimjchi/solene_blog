import React, {useContext, useEffect, useState} from 'react'
import { slide as Menu } from 'react-burger-menu'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'


import Link from 'next/link'

import { getCategories, getTags } from '../services'

const NavigationBar = () => {
    const [categories, setCategories] = useState<any>([])
    const [tags, setTags] = useState<any>([])
    const [isOpen, setIsOpen] = useState<boolean>(false)
    useEffect(() => {
      getCategories().then((newCategories:any) => setCategories([{name: "Accueil", slug: ""}, ...newCategories]))
      getTags().then((newTags:any) => setTags(newTags))
    }, [])

  return (
    <>
      <div className='container mx-auto w-full justify-between px-5 pt-8 md:flex hidden'>
        {
          categories.map((category: any) => (<Link replace href={`/${category.slug}`} key={category.slug}><span className='cursor-pointer font-bold text-sm lg:text-base'>{category.name}</span></Link>))
        }
      </div>
      <div className='md:hidden'>
        <Menu right isOpen={ isOpen } onOpen={() => setIsOpen(true)} onClose={ () => setIsOpen(false) }>
          <div className='items-center flex-row w-full mb-2' style={{display: 'flex'}}>
            <FontAwesomeIcon icon={faMagnifyingGlass} />
            <input placeholder='Search' type="text" required className='focus:outline-none green ml-1'/>
          </div>
          {
            categories.map((category: any) => (<Link replace href={`/${category.slug}`} key={category.slug}><span className='cursor-pointer font-bold bm-item' onClick={() => setIsOpen(false)}>{category.name}</span></Link>))
          }
          <div className='introduction text-center w-full py-1 mt-5'>
            <div className='relative overflow-hidden pb-52 mb-4'>
              <img src='https://media.graphassets.com/XpgYvvEoQ0etvlPK2pPU' alt='Une photo de Solene' className="object-top absolute h-52 w-full object-contain rounded-lg"></img>
            </div>
            <h4 className='mx-auto font-semibold text-center'>Introduction</h4>
            <p className='text-sm mx-auto text-center px-2'>
              Mauris fringilla placerat condimentum. Etiam non nunc at dolor sodales pulvinar. Sed sit amet turpis eu lacus commodo euismod vitae sed sem. Nullam ut dapibus metus, et sagittis leo. Proin vel nisi ut turpis lobortis laoreet at eget tortor.
            </p>
          </div>
          <div className='text-center mt-2'>
            <h4 className='mx-auto font-semibold'>Tags</h4>
            <div className='flex flex-wrap space-x-2 space-y-2 items-center'>
              {
                tags.map(({name, slug}: any, index: number) => (
                  <Link href={`/tag/${slug}`} key={slug}>
                    <span 
                      key={slug} 
                      className={"text-sm font-medium px-3 py-1 cursor-pointer border hover:bg-gray-100" + (index === 0 ? " mt-2 ml-2" : "")}
                      onClick={() => setIsOpen(false)}
                    >
                      #{name}
                    </span>
                  </Link>
                ))
              }
            </div>
          </div>
        </Menu>
      </div>
    </>
  )
}

export default NavigationBar