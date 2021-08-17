import * as path from "path"
import {PostMeta, PostMetaNormalize} from "./domain";
import {walk} from "../common/util/fs";
import {toArray} from "../common/util/array";

const postsDirectory = path.join(process.cwd(), "posts")

export async function getAllPostFilePaths() {
  const paths = await toArray(walk(postsDirectory, {
    ext: ['.md', '.mdx']
  }))
  return paths.map(e => path.relative(postsDirectory, e).replace(/\\/g, '/'))
}

export async function getPostMetaByFilePath(path: string): Promise<PostMetaNormalize> {
  const module = await import(`../posts/${path}`)
  const meta = module.meta as PostMeta
  return {
    ...meta,
    module: `../posts/${path}`,
    path: path,
    link: fileToUrl(path),
  }
}

export async function getPostMetaByUrlPath(path: string): Promise<PostMetaNormalize> {
  const paths = urlToFile(path);
  for (const p of paths) {
    try {
      return await getPostMetaByFilePath(p)
    } catch (e) {
      // ignore
    }
  }
  throw ''
}

export async function getAllPostMetas() {
  const slugs = await getAllPostFilePaths()
  const metas = await Promise.all(slugs.map(slug => getPostMetaByFilePath(slug)))
  metas.sort()
  return metas
}

function fileToUrl(p: string) {
  if (p.endsWith('.mdx')) {
    p = p.substring(0, p.length - 4)
  } else if (p.endsWith('.md')) {
    p = p.substring(0, p.length - 3)
  }
  if (p.endsWith('index')) {
    p = p.substring(0, p.length - 5)
  }
  return p
}

function urlToFile(p: string) {
  const res: string[] = []
  if (p.endsWith('/')) {
    p = p + 'index'
  }
  res.push(p + '.md')
  res.push(p + '.mdx')
  return res
}