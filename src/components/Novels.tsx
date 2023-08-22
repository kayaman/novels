'use client'
import React, { FormEvent, useState } from 'react'
import { useMutation, useQuery } from '@apollo/client'
import { GET_NOVELS } from '~/graphql/queries'

import { NovelWithAuthors } from '@/types'
import { Novel } from './Novel'

import { ADD_NOVEL } from '~/graphql/mutations'

export const Novels = () => {
  const [title, setTitle] = useState('')
  const [image, setImage] = useState('')
  const { data, loading, error } = useQuery(GET_NOVELS)
  const [addNovel] = useMutation(ADD_NOVEL, {
    variables: { image, title },
    refetchQueries: [{ query: GET_NOVELS }],
  })

  const novels: NovelWithAuthors[] = data?.novels

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (image === '' || title === '') return alert('Enter fields')

    addNovel({ variables: { image, title } })
    setTitle('')
    setImage('')
  }

  if (loading)
    return (
      <p className="flex items-center justify-center text-white">
        Loading ....
      </p>
    )
  if (error)
    return (
      <p className="flex items-center justify-center text-white">
        Oops! Something went wrong ....
      </p>
    )

  return (
    <div className="mt-5">
      <form onSubmit={handleSubmit} className="my-5 flex space-x-3">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          type="text"
          placeholder="Enter title"
          className="rounded-lg border bg-transparent p-2 text-white"
        />
        <input
          value={image}
          onChange={(e) => setImage(e.target.value)}
          type="text"
          placeholder="Enter Image url"
          className="rounded-lg border bg-transparent p-2 text-white"
        />
        <button className="rounded-lg bg-green-500 p-2 ">Add Novel</button>
      </form>
      <div className="grid grid-cols-4 gap-2">
        {novels.map((novel) => (
          <Novel key={novel.id} novel={novel} />
        ))}
      </div>
    </div>
  )
}
