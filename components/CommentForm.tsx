import moment from 'moment';
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { Comment, getPostComments, submitComment } from '../services';
import { getHowLongAgo } from '../utils/getStandardizedTime';

export default function CommentForm({postID}: {postID: string}) {
  const [comments, setComments] = useState<Comment[]>([])
  const numberOfComments = useMemo(() => comments.reduce((acc, current) => {
    return acc + current.childComments.length + 1
  }, 0), [comments])

  const [isReplying, setIsReplying] = useState<boolean>(false)

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

  const addComment = useCallback(({
    id,
    name,
    email,
    comment,
    createdAt,
    childComments
  }: Comment) => {
    setComments([...comments, {id,
      name,
      email,
      comment,
      createdAt,
      childComments}])
  }, [comments])

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
            {!isReplying && <CommentInputGroup postID={postID} fetchComments={fetchData} addComment={addComment}/>}
        </div>
    </div>
  )
}

function CommentInputGroup({
  postID,
  fetchComments,
  addComment
}: { postID: string, fetchComments: () => void, addComment: (comment: Comment) => void }) {
  const [name, setName] = useState<string>("")
  const [email, setEmail] = useState<string>("")
  const [comment, setComment] = useState<string>("")

  const isDisabled = useMemo(() => {
    return !name || !email || !comment
  }, [name, email, comment])

  const handleSubmit = useCallback(() => {
    submitComment({
      name, email, comment, postID
    }).then((res) => {
      // setShowSuccessMessage(true)
      // After a timeout setShowSuccessMessage(false)
      addComment({
        id: Math.random().toString(),
        name,
        email,
        comment,
        childComments: [],
        createdAt: new Date().toISOString()
      })
      setName("")
      setEmail("")
      setComment("")
      fetchComments()
    })
  }, [name, email, comment, postID])

  return (
    <div className='grid grid-cols-5 bg-slate-50 p-3'>
      <div className='flex flex-col space-y-2 ml-3 col-span-4'>
        <textarea placeholder=' Ajouter un commentaire' required className='green-border focus:outline-none' value={comment} onChange={(e) => setComment(e.target.value)} />
        <input placeholder=' Nom*' type="text" required className='green-border w-1/4 focus:outline-none' value={name} onChange={(e) => setName(e.target.value)}/>
        <input placeholder=' Adresse e-mail*' type="email" required className='green-border w-1/4 focus:outline-none' value={email} onChange={(e) => setEmail(e.target.value)}/>                
      </div>
      <div className='relative'>
        <input type="submit" onClick={handleSubmit} disabled={isDisabled} value="Envoyer" className={`w-20 absolute bottom-0 right-3 ${!isDisabled ? "green cursor-pointer" : ""}`}/>
      </div>
    </div>
  )
}