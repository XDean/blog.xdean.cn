import {ImageProps} from 'next/image'

export type PostMeta = {
  title: string
  summary?: string
  image?: ImageProps['src']
  date: Date
  categories: string[]
  tags: string[]
  prev?: string
  next?: string
}

export type PostMetaNormalize = PostMeta & {
  path: string // file path
  link: string // url path, both path relative to posts root
}

export const postMeta = (p: PostMeta) => p
