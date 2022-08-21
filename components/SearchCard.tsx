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
    <div className='search card w-full h-2/3 shadow-lg space-y-5 py-5'>
        <h4 className='mx-auto'>RECHERCHE</h4>
        <input placeholder='Search' type="text" required className='green-border-bt w-5/6 mx-auto focus:outline-none'/>
        <h4 className='mx-auto'>MOTS CLES</h4>
        <div className='flex flex-wrap space-x-2 space-y-2 items-center'>
        {
          tags.map(({name, slug}, index) => (
            <Link href={`/tag/${slug}`}>
              <span key={slug} className={"text-sm font-medium px-3 py-1 cursor-pointer border hover:bg-gray-100" + (index === 0 ? " mt-2 ml-2" : "")}>#{name}</span>
            </Link>
          ))
        }
        </div>
    </div>
  )
}