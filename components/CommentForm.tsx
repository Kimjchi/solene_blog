import React from 'react'

export default function CommentForm() {
  return (
    <div className='mt-3'>
        <h3 className='ml-5'>Zone de commentaires</h3>
        <div className='flex flex-col h-60 green-border shadow-lg p-3 relative bg-white relative space-y-2'>
            <textarea placeholder='Ajouter un commentaire' required className='green-border focus:outline-none'/>
            <input placeholder='Nom*' type="text" required className='green-border w-1/4 focus:outline-none'/>
            <input placeholder='Adresse e-mail*' type="email" required className='green-border w-1/4 focus:outline-none'/>
            <input type="submit" disabled value="Envoyer" className='cursor-pointer green w-20 absolute bottom-5 right-5'/>
        </div>
    </div>
  )
}

