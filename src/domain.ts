import {ReactNode} from "react";
import {ImageProps} from 'next/image'

export type PostMeta = Partial<{
  title: ReactNode
  summary: ReactNode
  image: ImageProps['src']
  date: Date | string
  categories: string[]
  tags: string[]
  prev: string
  next: string
}>

export type Post = {
  file: string // file path
  path: string // url path
  meta: PostMeta
}

export const postMeta = (p: PostMeta) => p