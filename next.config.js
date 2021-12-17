const withPlugins = require('next-compose-plugins');
const withMDX = require('@next/mdx');
const remarkPrism = require('remark-prism');
const remarkMath = require('remark-math');
const rehypeKatex = require('rehype-katex');
const rehypeSlug = require('rehype-slug');
const path = require('path');

module.exports = withPlugins([
  [withMDX({
      extension: /\.(md|mdx)$/,
      options: {
        remarkPlugins: [
          remarkMath,
          [remarkPrism, {
            plugins: [
              'line-numbers',
              'treeview',
            ]
          }]
        ],
        rehypePlugins: [
          rehypeSlug,
          [rehypeKatex, {
            strict: false
          }],
        ],
      },
    }
  )],
  {
    pageExtensions: ['ts', 'tsx', 'mdx'],
  }
]);