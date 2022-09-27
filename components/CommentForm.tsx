import { faReply } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useCallback, useEffect, useMemo, useState, useRef } from 'react'
import { animated, useSpring } from 'react-spring';
import { Comment, getPostComments, submitChildComment, submitComment } from '../services';
import { getHowLongAgo } from '../utils/getStandardizedTime';
import ReCAPTCHA from "react-google-recaptcha"

const RECAPTCHA_SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ""

export default function CommentForm({postID}: {postID: string}) {
  const [comments, setComments] = useState<Comment[]>([])
  const numberOfComments = useMemo(() => comments.reduce((acc, current) => {
    return acc + current.childComments.length + 1
  }, 0), [comments])

  const [isReplying, setIsReplying] = useState<boolean>(false)
  const [commentReplying, setCommentReplying] = useState<Comment>()

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
    setIsReplying(false)
  }, [comments])

  return (
    <div className='mt-3 md:w-5/6'>
        <h3 className='ml-3 font-finlandica-500 text-xl mb-5'>Zone de commentaires</h3>
        <div className='flex flex-col w-full h-full green-border shadow-lg p-3 relative bg-white rounded-lg'>
            <h4 className='ml-3 font-finlandica-500'>{numberOfComments} commentaire(s)</h4>
            <div className='mb-10'>
              {
                comments.map(
                  (comment, index) => (
                    <div className='space-y-2' key={comment.id}>
                      <div className='m-2 bg-slate-50 flex flex-col pl-3'>
                        <div className='flex w-full justify-between'>
                          <div>
                            <div className='flex items-center w-full'>
                              <h4 className='text-lg bold mr-2'>{comment.name}</h4> 
                              <span>{getHowLongAgo(comment.createdAt)}</span>
                            </div>
                            <p className=''>{comment.comment}</p>
                          </div>
                          <span 
                            className='cursor-pointer mr-6 mt-3 hover-green'
                            onClick={() => {
                              setIsReplying(!isReplying || comment.id !== commentReplying?.id); 
                              setCommentReplying(comment); 
                            }}
                          >
                            <FontAwesomeIcon icon={faReply} className=''/>
                            {" Répondre"}
                          </span>
                        </div>
                      </div>
                      {
                        isReplying && 
                        commentReplying?.id === comment.id && 
                        <CommentInputGroup 
                          postID={postID} 
                          fetchComments={fetchData} 
                          addComment={addComment} 
                          commentReplying={commentReplying}
                          initialComment={`@${comment.name}, `}
                          id={index + 1}
                        />
                      }
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
            {<CommentInputGroup postID={postID} fetchComments={fetchData} addComment={addComment} id={0}/>}
        </div>
    </div>
  )
}

function CommentInputGroup({
  postID,
  fetchComments,
  addComment,
  commentReplying,
  initialComment = "",
  id
}: { id: number, postID: string, fetchComments: () => void, addComment: (comment: Comment) => void, commentReplying?: Comment, initialComment? : string }) {
  const [name, setName] = useState<string>("")
  const [email, setEmail] = useState<string>("")
  const [comment, setComment] = useState<string>(initialComment)
  const [captchaValue, setCaptchaValue] = useState<string | null>();

  const emailErr = useMemo(() => {
    return (!(/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(email)) && !!email)
  }, [email])

  const isDisabled = useMemo(() => {
    return !name || emailErr || !comment || !captchaValue
  }, [name, comment, emailErr, captchaValue])

  const recaptchaRef: any = useRef([]);

  const handleSubmit = useCallback(() => {
    (commentReplying ? 
      submitChildComment({name, email, comment, parentCommentID: commentReplying.id, captcha: captchaValue}) : 
      submitComment({
      name, email, comment, postID, captcha: captchaValue
    })).then((res) => {
      // Reset the reCAPTCHA so that it can be executed again if user 
      // submits another email.
      recaptchaRef.current[id].reset();
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
  }, [name, email, comment, postID, recaptchaRef, captchaValue, id])

  const onReCAPTCHAChange = (captchaCode: any) => {
    // If the reCAPTCHA code is null or undefined indicating that
    // the reCAPTCHA was expired then return early
    if(!captchaCode) {
      return;
    }
    setCaptchaValue(captchaCode)
  }

  const props: any = useSpring({ to: { opacity: 1, marginTop: 0 }, from: { opacity: 0, marginTop: -20 } })

  return (
      <animated.div className=' w-full h-full grid grid-cols-5 bg-slate-50 p-3' style={props}>
      <div className='flex flex-col space-y-2 ml-3 col-span-4'>
        <textarea placeholder=' Ajouter un commentaire' required className='green-border focus:outline-none' value={comment} onChange={(e) => setComment(e.target.value)} />
        <input placeholder=' Nom*' type="text" required className='green-border w-1/4 focus:outline-none' value={name} onChange={(e) => setName(e.target.value)}/>
        <input 
          placeholder=' Adresse e-mail' 
          type="email" 
          required 
          className={` w-1/4 focus:outline-none ${emailErr ? "border-rose-500 border" : "green-border"}`}
          value={email} 
          onChange={(e) => setEmail(e.target.value)}
        />
        <ReCAPTCHA
          ref={recaptchaRef[id]}
          sitekey={RECAPTCHA_SITE_KEY}
          onChange={onReCAPTCHAChange}
        />                
      </div>
      <div className='relative'>
        <input type="submit" onClick={handleSubmit} disabled={isDisabled} value="Envoyer" className={`w-20 absolute bottom-0 right-3 ${!isDisabled ? "green cursor-pointer" : ""}`}/>
      </div>
      </animated.div>
  )
}