const path = require('path')

module.exports = async function (src) {
  const postPath = path.relative(path.join(this.rootContext, 'pages/posts'), this.resourcePath)
    .replace(/\\/g, '/')
  return `import {getPostMetaByFilePath} from "src/api";

${src}

export const getStaticProps = async function (ctx) {
  const meta = await getPostMetaByFilePath('${postPath}')
  return {
    props: {
      meta: meta
    }
  }
}
`
}