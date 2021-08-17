import {ReactNode} from "react";
import {ImageProps} from 'next/image'

export type PostMeta = {
  title: ReactNode
  summary?: ReactNode
  image?: ImageProps['src']
  date: Date
  categories: string[]
  tags: string[]
  prev?: string
  next?: string
}

export type PostMetaNormalize = PostMeta & {
  module: string
  path: string // file path
  link: string // url path without prefix
}

export const postMeta = (p: PostMeta) => p