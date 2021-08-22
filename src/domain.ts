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
  toc?: boolean
  links?: {
    name: string
    link: string
  }[]
}

export type TocItem = {
  level: number
  text: string
  anchor: string
}

export type PostMeta = PostMetaInline & {
  path: string // file path
  link: string // url path, both path relative to posts root
  tocData?: TocItem[]
}

export const postMeta = (p: PostMetaInline) => p
