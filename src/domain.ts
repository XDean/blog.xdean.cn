import {ImageProps} from 'next/image'

export type PostMetaInline = {
  title?: string
  summary?: string
  image?: Exclude<ImageProps['src'], string>
  date: string
  categories: string[]
  tags: string[]
  prev?: string
  next?: string
  toc?: boolean
  draft?: boolean
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
  prevMeta?: PostMeta
  nextMeta?: PostMeta
}

export const postMeta = (p: PostMetaInline) => p
