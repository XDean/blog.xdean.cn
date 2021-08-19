import {ImageProps} from 'next/image'

export type PostMetaInline = {
  title?: string
  summary?: string
  image?: ImageProps['src']
  date: Date
  categories: string[]
  tags: string[]
  prev?: string
  next?: string
}

export type PostMeta = PostMetaInline & {
  path: string // file path
  link: string // url path, both path relative to posts root
}

export const postMeta = (p: PostMetaInline) => p
