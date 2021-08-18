const withPlugins = require('next-compose-plugins');
const withMDX = require('@next/mdx');
const rehypePrism = require('@mapbox/rehype-prism');
const remarkMath = require('remark-math')
const rehypeKatex = require('rehype-katex')

module.exports = withPlugins([
  {
    pageExtensions: ['tsx', 'mdx'],
    webpack: (config, options) => {
      config.module.rules.push({
        test:  /\.(md|mdx)$/,
        use: [
          options.defaultLoaders.babel,
          {
            loader: require.resolve('@mdx-js/loader'),
            options: {
              remarkPlugins: [remarkMath],
              rehypePlugins: [
                rehypeKatex,
                [rehypePrism, {
                  ignoreMissing: true
                }]
              ],
            },
          },
          {
            loader: require.resolve('./script/post-loader')
          }
        ],
      })
      return config
    },
  }
])