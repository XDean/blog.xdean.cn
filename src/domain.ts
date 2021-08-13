import {ReactElement} from "react";
import {ImageProps} from 'next/image'

export type Post = {
  file: string // file path
  path: string // url path
  title: ReactElement
  summary: ReactElement
  image: ImageProps['src']
  date: Date | string
  categories: string[]
  tags: string[]
  prev: string
  next: string
}