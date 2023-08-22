import { BASE_URL } from '~/config'
import { DELETE_NOVEL } from '~/graphql/mutations'
import { GET_NOVELS } from '~/graphql/queries'
import { NovelWithAuthors } from '@/types'
import { useMutation } from '@apollo/client'
import Link from 'next/link'
import Image from 'next/image'
import React from 'react'

type Props = {
  novel: NovelWithAuthors
}

export const Novel = ({ novel }: Props) => {
  const [deleteNovel] = useMutation(DELETE_NOVEL, {
    refetchQueries: [{ query: GET_NOVELS }],
  })
  return (
    <article className="flex flex-col bg-slate-200  p-4 text-white shadow-sm transition duration-300 ease-out hover:scale-110 hover:bg-slate-300 hover:shadow-lg dark:bg-zinc-800 ">
      {/* image */}
      {novel.image && (
        <div>
          <Image
            src={novel.image}
            alt={novel.title}
            width={200}
            height={500}
            className="h-56 w-full rounded-t-lg object-contain shadow-md"
          />
        </div>
      )}

      {/*title  */}
      <h1 className="my-2 text-xl font-bold">{novel.title}</h1>
      {/* description */}
      <p className="my-2 line-clamp-3 text-xs">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio ab
        recusandae repudiandae ratione quia voluptatibus tempora dolores,
        veritatis cum, soluta numquam voluptatum earum obcaecati illum dolor.
        Fuga incidunt maxime culpa.
      </p>
      {/* source and date */}
      <div className="ß mt-auto flex	 justify-between text-xs italic  text-slate-500">
        <p className="text-lg text-white">Authors :{novel?.authors.length}</p>
      </div>
      <Link
        href={`/novel/${novel.id}`}
        className="mt-5 rounded-lg bg-orange-500 p-2"
      >
        Read More
      </Link>

      <button
        onClick={() => deleteNovel({ variables: { id: novel.id } })}
        className="mt-5 rounded-lg bg-red-500 p-2"
      >
        Delete
      </button>
    </article>
  )
}
