import * as path from "path"
import {PostMeta, PostMetaInline, TocItem} from "./domain";
import {walk} from "../common/util/fs";
import {toArray} from "../common/util/array";
import ReactDOM from "react-dom/server";
import React from "react";
import {JSDOM} from 'jsdom'
import {CONSTANT} from "./constants";

const postsDirectory = path.join(process.cwd(), "pages/posts")

export async function getAllPostFilePaths() {
  const paths = await toArray(walk(postsDirectory, {
    ext: ['.md', '.mdx']
  }))
  return paths.map(e => path.relative(postsDirectory, e).replace(/\\/g, '/'))
}

export async function getPostMetaByFilePath(path: string): Promise<PostMeta> {
  const module = await import(`pages/posts/${path}`)
  const meta = {
    ...module.meta as PostMetaInline,
    path: path,
    link: fileToUrl(path),
  } as PostMeta
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
    const text = Array.from(paragraphs).map(e => e.textContent!).join('\n')
    meta.summary = text.substring(0, Math.min(text.length, CONSTANT.summarySize))
    const idx = meta.summary.lastIndexOf('\n')
    if (idx !== -1) {
      meta.summary = meta.summary.substring(0, idx)
    }
  }
  if (!meta.image) {
    const imageNode = root.querySelector('img')
    if (imageNode !== null) {
      meta.image = imageNode.src
    }
  }
  if (meta.toc !== false) {
    const headers = root.querySelectorAll('h2,h3,h4')
    const toc: TocItem[] = []
    headers.forEach(h => {
      const level = Number(h.tagName.substring(1))
      toc.push({
        level: level,
        text: h.textContent!,
        anchor: h.id,
      })
    })
    meta.tocData = toc
  }

  return meta
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
  return await Promise.all(slugs.map(slug => getPostMetaByFilePath(slug)))
}

function fileToUrl(p: string) {
  if (p.endsWith('.mdx')) {
    p = p.substring(0, p.length - 4)
  } else if (p.endsWith('.md')) {
    p = p.substring(0, p.length - 3)
  }
  return p
}

function urlToFile(p: string) {
  const res: string[] = []
  res.push(p + '.mdx')
  res.push(p + '.md')
  return res
}