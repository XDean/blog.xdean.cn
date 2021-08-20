const withPlugins = require('next-compose-plugins');
const rehypePrism = require('@mapbox/rehype-prism');
const remarkMath = require('remark-math')
const rehypeKatex = require('rehype-katex')
const rehypeSlug = require('rehype-slug')
const path = require('path')

module.exports = withPlugins([
  {
    pageExtensions: ['tsx', 'mdx'],
    webpack: (config, options) => {
      config.module.rules.push({
        test:  /\.mdx$/,
        include: [
          path.resolve(__dirname, "pages/posts")
        ],
        use: [
          options.defaultLoaders.babel,
          {
            loader: require.resolve('./script/post-page-post-loader')
          },
          {
            loader: require.resolve('@mdx-js/loader'),
            options: {
              remarkPlugins: [remarkMath],
              rehypePlugins: [
                rehypeSlug,
                rehypeKatex,
                [rehypePrism, {
                  ignoreMissing: true
                }]
              ],
            },
          },
          {
            loader: require.resolve('./script/post-page-pre-loader')
          }
        ],
      })
      return config
    },
  }
])