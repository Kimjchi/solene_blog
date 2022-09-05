import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import React, { useCallback, useEffect, useState } from 'react'
import { getTags, Tag } from '../services';

export default function SearchCard() {
  const [tags, setTags] = useState<Tag[]>([]);

  // declare the async data fetching function
const fetchData = useCallback(async () => {
  const tags: Tag[] = await getTags();
  setTags(tags);
}, [])

  useEffect(() => {
    fetchData()
    // make sure to catch any error
    .catch(console.error);;
  }, [fetchData])

  return (
    <div className='search text-center w-full h-2/3 space-y-5 py-5'>
        <h4 className='mx-auto'>RECHERCHE</h4>
        <div className='items-center justify-center flex-row w-full' style={{display: 'flex'}}>
            <FontAwesomeIcon icon={faMagnifyingGlass} />
            <input placeholder='Search' type="text" required className='focus:outline-none ml-2 green-border-bt w-4/6'/>
          </div>
        <h4 className='mx-auto'>MOTS CLES</h4>
        <div className='flex flex-wrap space-x-2 space-y-2 items-center'>
        {
          tags.map(({name, slug}, index) => (
            <Link href={`/tag/${slug}`} key={slug}>
              <span key={slug} className={"text-sm font-medium px-3 py-1 cursor-pointer border hover:bg-gray-100" + (index === 0 ? " mt-2 ml-2" : "")}>#{name}</span>
            </Link>
          ))
        }
        </div>
    </div>
  )
}