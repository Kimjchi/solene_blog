import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import React, { useCallback, useEffect, useState } from 'react'
import { getTags, Tag } from '../services';
import { useRouter } from 'next/router';

export default function SearchCard() {
  const router = useRouter()
  const [tags, setTags] = useState<Tag[]>([]);
  const [keyword, setKeyword] = useState<string>("");

  // declare the async data fetching function
const fetchData = useCallback(async () => {
  const tags: Tag[] = await getTags();
  setTags(tags.sort((a,b) => {
    return b.posts.length - a.posts.length
  }).slice(0, 10));
}, [])

  useEffect(() => {
    fetchData()
    // make sure to catch any error
    .catch(console.error);;
  }, [fetchData])

  const handleSearchSubmit = (e: any) => {
    e.preventDefault()
    router.push("/search/" + keyword)
    setKeyword("")
  }
  const handleKeyDown = (e: any) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      router.push("/search/" + keyword)
      setKeyword("")
    }
  }

  return (
    <div className='search text-center w-full h-2/3 py-5'>
        <h4 className='mx-auto font-finlandica-500 mb-5'>RECHERCHE</h4>
        <div className='mb-20 items-center justify-center flex-row w-full' style={{display: 'flex'}}>
            <FontAwesomeIcon icon={faMagnifyingGlass} className="cursor-pointer" onClick={handleSearchSubmit}/>
            <input placeholder='Search' type="text" required className='focus:outline-none ml-2 yellow-border-bt w-4/6' value={keyword} onChange={(e) => setKeyword(e.target.value)} onKeyDown={handleKeyDown}/>
          </div>
        <h4 className='mx-auto font-finlandica-500 mb-5'>MOTS CLES</h4>
        <div className='flex flex-wrap space-x-2 space-y-2 items-center justify-center'>
        {
          tags.map(({name, slug}, index) => (
            <Link href={`/tag/${slug}`} key={slug}>
              <span key={slug} className={"px-3 py-1 cursor-pointer border hover:bg-gray-100" + (index === 0 ? " mt-2 ml-2" : "")}>#{name}</span>
            </Link>
          ))
        }
        </div>
    </div>
  )
}