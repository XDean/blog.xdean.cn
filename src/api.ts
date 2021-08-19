import * as path from "path"
import {PostMeta, PostMetaInline} from "./domain";
import {walk} from "../common/util/fs";
import {toArray} from "../common/util/array";
import ReactDOM from "react-dom/server";
import React from "react";
import {JSDOM} from 'jsdom'

const postsDirectory = path.join(process.cwd(), "pages/posts")

export async function getAllPostFilePaths() {
  const paths = await toArray(walk(postsDirectory, {
    ext: ['.md', '.mdx']
  }))
  return paths.map(e => path.relative(postsDirectory, e).replace(/\\/g, '/'))
}

export async function getPostMetaByFilePath(path: string): Promise<PostMeta> {
  const module = await import(`pages/posts/${path}`)
  const meta = {...module.meta as PostMetaInline}
  const content = ReactDOM.renderToStaticMarkup(React.createElement(module.default))
  const root = new JSDOM(content).window.document
  if (!meta.title) {
    const titleNode = root.querySelector('h1')
    if (titleNode === null) {
      throw `${path} has no title`
    }
    meta.title = titleNode.textContent!
  }
  if (!meta.summary) {
    const paragraphs = root.querySelectorAll('p');
    meta.summary = Array.from(paragraphs).map(e => e.textContent!).join('\n')
  }
  if (!meta.image) {
    const imageNode = root.querySelector('img')
    if (imageNode !== null) {
      meta.image = imageNode.src
    }
  }

  return {
    ...meta,
    path: path,
    link: fileToUrl(path),
  }
}

export async function getPostMetaByUrlPath(path: string): Promise<PostMeta> {
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
  res.push(p + '.mdx')
  res.push(p + '.md')
  return res
}