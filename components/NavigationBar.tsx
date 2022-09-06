import React, {useEffect, useState} from 'react'
import { slide as Menu } from 'react-burger-menu'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { useRouter } from 'next/router';

import Link from 'next/link'

import { getCategories, getTags } from '../services'

const NavigationBar = () => {
    const router = useRouter()
    const [categories, setCategories] = useState<any>([])
    const [tags, setTags] = useState<any>([])
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [keyword, setKeyword] = useState<string>("");

    useEffect(() => {
      getCategories().then((newCategories:any) => setCategories([{name: "Accueil", slug: ""}, ...newCategories]))
      getTags().then((newTags:any) => setTags(newTags))
    }, [])

    const handleSearch = (e: any) => {
      e.preventDefault()
      router.push("/search/" + keyword)
      setKeyword("")
      setIsOpen(false)
    }

    const handleSearchSubmit = (e: any) => {
      handleSearch(e)
    }
    const handleKeyDown = (e: any) => {
      if (e.key === 'Enter') {
        handleSearch(e)
      }
    }

  return (
    <>
      <div className='container mx-auto w-full justify-between px-5 pt-8 md:flex hidden font-finlandica'>
        {
          categories.map((category: any) => (<Link replace href={`/${category.slug}`} key={category.slug}><span className='cursor-pointer lg:text-base'>{category.name}</span></Link>))
        }
      </div>
      <div className='md:hidden'>
        <Menu right isOpen={ isOpen } onOpen={() => setIsOpen(true)} onClose={ () => setIsOpen(false) }>
          <div className='items-center flex-row w-full mb-2' style={{display: 'flex'}}>
            <FontAwesomeIcon icon={faMagnifyingGlass} className="cursor-pointer" onClick={handleSearchSubmit}/>
            <input placeholder='Search' type="text" required className='focus:outline-none green ml-1' value={keyword} onChange={(e) => setKeyword(e.target.value)} onKeyDown={handleKeyDown}/>
          </div>
          {
            categories.map((category: any) => (<Link replace href={`/${category.slug}`} key={category.slug}><span className='cursor-pointer bm-item font-finlandica' onClick={() => setIsOpen(false)}>{category.name}</span></Link>))
          }
          <div className='introduction text-center w-full py-1 mt-5'>
            <div className='relative overflow-hidden pb-40 mb-4'>
              <img src='https://media.graphassets.com/gQJpz2A9R0aQkJrnie2W' alt='Une photo de Solene' className="object-top absolute h-40 w-full object-contain rounded-lg"></img>
            </div>
            <h4 className='mx-auto font-finlandica-500 text-center'>Introduction</h4>
            <p className='mx-auto text-center px-2'>
              Mauris fringilla placerat condimentum. Etiam non nunc at dolor sodales pulvinar. Sed sit amet turpis eu lacus commodo euismod vitae sed sem. Nullam ut dapibus metus, et sagittis leo. Proin vel nisi ut turpis lobortis laoreet at eget tortor.
            </p>
          </div>
          <div className='text-center mt-2'>
            <h4 className='mx-auto font-finlandica-500'>Tags</h4>
            <div className='flex flex-wrap space-x-2 space-y-2 items-center'>
              {
                tags.map(({name, slug}: any, index: number) => (
                  <Link href={`/tag/${slug}`} key={slug}>
                    <span 
                      key={slug} 
                      className={"px-3 py-1 cursor-pointer border hover:bg-gray-100" + (index === 0 ? " mt-2 ml-2" : "")}
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