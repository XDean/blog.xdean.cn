import {slash} from 'common/util/path';
import {JSDOM} from 'jsdom';
import * as path from 'path';
import React from 'react';
import ReactDOM from 'react-dom/server';
import {toArray} from '../common/util/array';
import {walk} from '../common/util/fs';
import {getPage} from '../common/util/page';
import {CONSTANT} from './constants';
import {PostMeta, PostMetaInline, TocItem} from './domain';

const postsDirectory = path.join(process.cwd(), 'pages/posts');

export async function getAllPostFilePaths() {
  const paths = await toArray(walk(postsDirectory, {
    ext: ['.md', '.mdx'],
  }));
  return paths.map(e => slash(path.relative(postsDirectory, e)));
}

export async function getPostMetaByFilePath(path: string): Promise<PostMeta> {
  console.log(path, new Date())
  path = slash(path);
  const module = await import(`pages/posts/${path}`);
  const meta = {
    ...module.meta as PostMetaInline,
    path: path,
    link: fileToUrl(path),
  } as PostMeta;
  const content = ReactDOM.renderToStaticMarkup(React.createElement(module.default));
  const root = new JSDOM(content).window.document;
  if (!meta.title) {
    const titleNode = root.querySelector('h1');
    if (titleNode === null) {
      throw `${path} has no title`;
    }
    meta.title = titleNode.textContent!;
  }
  if (!meta.summary) {
    const paragraphs = root.querySelectorAll('p');
    const text = Array.from(paragraphs).map(e => e.textContent!).join('\n');
    meta.summary = text.substring(0, Math.min(text.length, CONSTANT.summarySize));
    const idx = meta.summary.lastIndexOf('\n');
    if (idx !== -1) {
      meta.summary = meta.summary.substring(0, idx);
    }
  }
  if (meta.toc !== false) {
    const headers = root.querySelectorAll('h2,h3,h4');
    const toc: TocItem[] = [];
    headers.forEach(h => {
      const level = Number(h.tagName.substring(1));
      toc.push({
        level: level,
        text: h.textContent!,
        anchor: h.id,
      });
    });
    meta.tocData = toc;
  }

  return meta;
}

export async function getAllPostMetas() {
  const slugs = await getAllPostFilePaths();
  return (await Promise.all(slugs.map(slug => getPostMetaByFilePath(slug)))).filter(e => !e.draft);
}

export async function getPostByPage(page: number) {
  const metas = await getAllPostMetas();
  metas.sort((a, b) =>
    new Date(b.date).getTime() - new Date(a.date).getTime());
  return getPage(metas, page, CONSTANT.pageSize);
}

function fileToUrl(p: string) {
  if (p.endsWith('.mdx')) {
    p = p.substring(0, p.length - 4);
  } else if (p.endsWith('.md')) {
    p = p.substring(0, p.length - 3);
  }
  if (p.endsWith('/index')) {
    p = p.substring(0, p.length - 6);
  }
  return p;
}