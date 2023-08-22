import { Author, Novel } from '@prisma/client'

interface NovelWithAuthors extends Novel {
  authors: Author[]
}
