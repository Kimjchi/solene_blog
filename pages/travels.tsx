import React, { useCallback, useEffect, useMemo, useState } from 'react'
import Loading from '../components/atoms/Loading';
import OpaquePhoto from '../components/atoms/OpaquePhoto';
import Pagination from '../components/Pagination';
import PostCard from '../components/PostCard';
import { getPhotosAndTravelPosts, Photo, PhotoAndPost, PhotoAndTravelPost, Post } from '../services';

  export default function TravelsPage() {
    const [photosAndTravelPosts, setPhotosAndTravelPosts] = useState<PhotoAndTravelPost[]>([]);
    const [totalPage, setTotalPage] = useState<number>(1);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const {countPostsDisplayed, countPhotosDisplayed} = useMemo(() => {
      let countPostsDisplayed = 0;
      let countPhotosDisplayed = 0;
      photosAndTravelPosts.forEach(d => {
        if (d.type === PhotoAndPost.photo) {
          countPhotosDisplayed++
        }
        else {
          countPostsDisplayed++
        };
      })
      return {
        countPostsDisplayed, countPhotosDisplayed
      }
    }, [photosAndTravelPosts])

    // declare the async data fetching function
    const fetchData = useCallback(async (selectedPage: number) => {
      setIsLoading(true);
      const skipPhotos = (selectedPage - 1) * countPhotosDisplayed
      const skipPosts = (selectedPage - 1) * countPostsDisplayed
      const results = await (getPhotosAndTravelPosts({skipPosts, skipPhotos}) || []);    
      let countPhotos = 0;
      let countPosts = 0;
      const photosAndTravelPosts = results.data.filter(d => {
        if (d.type === PhotoAndPost.photo) {
          countPhotos++
        }
        else {
          countPosts++
        };
        return (countPosts + Math.ceil(countPhotos / 2)) < 7;
      })

      setPhotosAndTravelPosts(photosAndTravelPosts);
      setTotalPage(Math.ceil((results.postsCount + (results.photosCount / 2)) / 6))
      setIsLoading(false)
    }, [countPostsDisplayed, countPhotosDisplayed]) 

    useEffect(() => {
      fetchData(1)
      // make sure to catch any error
      .catch(console.error);
    }, [])
    
      return (
          <div className='w-full h-full -mt-12 pt-12 flex flex-col'>
            {
            isLoading && <Loading />
            }
            {
            !isLoading && photosAndTravelPosts.length > 0 && 
              <div className="grid lg:grid-flow-col-dense grid-cols-1 lg:grid-cols-3 w-full gap-4 overflow-hidden h-1/2 mb-8 -mt-8 pt-10 lg:grid-rows-4">
                  {photosAndTravelPosts.map(({data, type}, index) => {
                    return (
                      <>
                      {
                        type == PhotoAndPost.post ? 
                          <PostCard 
                            title={data.title} 
                            theme={(data as Post).category?.name} 
                            image={(data as Post).featuredImage.url} 
                            excerpt={(data as Post).excerpt} 
                            date={new Date(data.publishedAt)}
                            key={data.id}
                            url={(data as Post).slug}
                            index={index}
                            tags={(data as Post).tags.map(({name}) => name)}
                            optionalClasses={`lg:row-span-2`}
                          /> : <OpaquePhoto 
                              title={data.title} 
                              imageURL={(data as Photo).image.url} 
                              date={(data as Photo).date}
                              location={(data as Photo).location}
                              index={index}
                            />
                      }
                  </>)
                  }) }
              </div>
            }
            {photosAndTravelPosts.length > 0 && <Pagination pageNumber={totalPage} callBack={fetchData}/>}
            {!isLoading && photosAndTravelPosts.length === 0 && <h2 className='pt-10 text-xl font-finlandica-500'>De prochains articles seront bientôt disponibles !</h2>}
          </div>
      )
}