import moment from 'moment';
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { Comment, getPostComments } from '../services';
import { getHowLongAgo } from '../utils/getStandardizedTime';

export default function CommentForm({postID}: {postID: string}) {
  const [comments, setComments] = useState<Comment[]>([])
  const numberOfComments = useMemo(() => comments.reduce((acc, current) => {
    return acc + current.childComments.length + 1
  }, 0), [comments])

  // declare the async data fetching function
  const fetchData = useCallback(async () => {
    const comments: Comment[] = await getPostComments(postID);
    setComments(comments);
  }, [postID])

  useEffect(() => {
    fetchData()
    // make sure to catch any error
    .catch(console.error);;
  }, [fetchData]);

  return (
    <div className='mt-3 w-5/6'>
        <h3 className='ml-3 font-finlandica-500 text-xl mb-5'>Zone de commentaires</h3>
        <div className='flex flex-col h-full green-border shadow-lg p-3 relative bg-white rounded-lg'>
            <h4 className='ml-3 font-finlandica-500'>{numberOfComments} commentaire(s)</h4>
            <div className='mb-10'>
              {
                comments.map(
                  comment => (
                    <div className='space-y-2' key={comment.id}>
                      <div className='m-2 bg-slate-50 flex flex-col pl-3'>
                        <div className='flex items-center w-full'><h4 className='text-lg bold mr-2'>{comment.name}</h4> <span>{getHowLongAgo(comment.createdAt)}</span></div>
                        <p className=''>{comment.comment}</p>
                      </div>
                      <div className='pl-3'>
                        {
                          comment.childComments.map(
                            childComment => (
                              <div className='flex' key={childComment.id}>
                                <div className='border-l-4 border-green'></div>
                                <div className='mx-2 bg-slate-50 flex flex-col pl-5 w-full' key={childComment.id}>
                                  <div className='flex items-center w-full'><h4 className='text-lg bold mr-2'>{childComment.name}</h4> <span>{getHowLongAgo(childComment.createdAt)}</span></div>
                                  <p className=''>{childComment.comment}</p>
                                </div>
                              </div>
                            )
                          )
                        }
                      </div>
                    </div>
                  )
                )
              }
            </div>
            <div className='grid grid-cols-5 bg-slate-50 p-3'>
              <div className='flex flex-col space-y-2 ml-3 col-span-4'>
                <textarea placeholder=' Ajouter un commentaire' required className='green-border focus:outline-none'/>
                <input placeholder=' Nom*' type="text" required className='green-border w-1/4 focus:outline-none'/>
                <input placeholder=' Adresse e-mail*' type="email" required className='green-border w-1/4 focus:outline-none'/>                
              </div>
              <div className='relative'>
                <input type="submit" disabled value="Envoyer" className='cursor-pointer green w-20 absolute bottom-0 right-3'/>
              </div>
            </div>
        </div>
    </div>
  )
}