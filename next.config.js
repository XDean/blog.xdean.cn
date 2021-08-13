const withPlugins = require('next-compose-plugins');
const withMDX = require('@next/mdx');
const rehypePrism = require('@mapbox/rehype-prism');
const remarkMath = require('remark-math')
const rehypeKatex = require('rehype-katex')

module.exports = withPlugins([
  [withMDX({
      extension: /\.(md|mdx)$/,
      options: {
        remarkPlugins: [remarkMath],
        rehypePlugins: [
          rehypeKatex,
          [rehypePrism, {
            ignoreMissing: true
          }]
        ],
      },
    }
  )],
  {
    pageExtensions: ['tsx', 'mdx']
  }
])