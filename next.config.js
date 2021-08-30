const withPlugins = require('next-compose-plugins');
const remarkPrism = require('remark-prism');
const remarkMath = require('remark-math')
const rehypeKatex = require('rehype-katex')
const rehypeSlug = require('rehype-slug')
const path = require('path')

module.exports = withPlugins([
  {
    pageExtensions: ['ts', 'tsx', 'mdx'],
    webpack: (config, options) => {
      config.module.rules.push({
        test: /\.mdx$/,
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
                rehypeKatex,
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