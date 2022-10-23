import React, { useCallback, useEffect, useState } from 'react'
import Loading from '../components/atoms/Loading';
import OpaquePhoto from '../components/atoms/OpaquePhoto';
import Pagination from '../components/Pagination';
import PostCard from '../components/PostCard';
import { getPhotosAndTravelPosts, Photo, PhotoAndPost, PhotoAndTravelPost, Post } from '../services';

  export default function TravelsPage() {
    const [photosAndTravelPosts, setPhotosAndTravelPosts] = useState<PhotoAndTravelPost[]>([]);
    const [totalPage, setTotalPage] = useState<number>(1);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [countPostsDisplayed, setCountPostsDisplayed] = useState<number>(0);
    const [countPhotosDisplayed, setCountPhotosDisplayed] = useState<number>(0);

    // declare the async data fetching function
    const fetchData = useCallback(async (selectedPage: number) => {
      setIsLoading(true);
      const skipPhotos = (selectedPage - 1) * countPhotosDisplayed
      const skipPosts = (selectedPage - 1) * countPostsDisplayed
      const data = await (getPhotosAndTravelPosts({skipPosts, skipPhotos}) || []);
      let count = 0;
      let countPostsDis = 0;
      let countPhotosDis = 0;
      let countPhotos = 0;
      let totalPhotos = 0;
      let totalPosts = 0;
      const photosAndTravelPosts = data.filter(d => {
        if (d.type === PhotoAndPost.photo) {
          countPhotos++
          countPhotosDis++
          totalPhotos = d.count
        }
        else {
          countPostsDis++
          countPhotos = 0
          count++
          totalPosts = d.count
        };
        if (countPhotos > 1) {
          countPhotos = 0
          count++
        }
        return count < 7;
      })
      setCountPostsDisplayed(countPostsDis);
      setCountPhotosDisplayed(countPhotosDis);

      setPhotosAndTravelPosts(photosAndTravelPosts);
      setTotalPage(Math.ceil((totalPosts + totalPhotos / 2) / 6))
      setIsLoading(false)
    }, [])

    useEffect(() => {
      fetchData(1)
      // make sure to catch any error
      .catch(console.error);
    }, [fetchData])
    
      return (
          <div className='w-full h-full -mt-12 pt-12 flex flex-col'>
            {
            isLoading && <Loading />
            }
            <div className="grid grid-cols-1 lg:grid-cols-3 w-full gap-4 overflow-hidden h-1/2 mb-8 -mt-8 pt-10 grid-rows-4">
                {!isLoading && photosAndTravelPosts.map(({data, type}, index) => {
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
                          optionalClasses="row-span-2"
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
            {!isLoading && photosAndTravelPosts.length > 0 && <Pagination pageNumber={totalPage} callBack={fetchData}/>}
            {!isLoading && photosAndTravelPosts.length === 0 && <h2 className='text-xl font-finlandica-500'>De prochains articles seront bientôt disponibles !</h2>}
          </div>
      )
}