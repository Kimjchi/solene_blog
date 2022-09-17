import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { Comment, getPostComments } from '../services';

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
  }, [fetchData])
  return (
    <div className='mt-3'>
        <h3 className='ml-3 font-finlandica-500 text-xl mb-5'>Zone de commentaires</h3>
        <div className='flex flex-col h-60 green-border shadow-lg p-3 relative bg-white relative space-y-2 rounded-lg'>
            <h4 className='ml-3 font-finlandica-500'>{numberOfComments} commentaire(s)</h4>
            <div className='flex flex-col space-y-2 ml-3'>
              <textarea placeholder=' Ajouter un commentaire' required className='green-border focus:outline-none'/>
              <input placeholder=' Nom*' type="text" required className='green-border w-1/4 focus:outline-none'/>
              <input placeholder=' Adresse e-mail*' type="email" required className='green-border w-1/4 focus:outline-none'/>
              <input type="submit" disabled value="Envoyer" className='cursor-pointer green w-20 absolute bottom-5 right-5'/>
            </div>
        </div>
    </div>
  )
}