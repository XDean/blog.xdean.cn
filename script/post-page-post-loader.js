const path = require('path')

module.exports = async function (src) {
  const postPath = path.relative(path.join(this.rootContext, 'pages/posts'), this.resourcePath)
  return `import {getPostMetaByFilePath} from "src/service";
import * as path from "path"

${src}

export const getStaticProps = async function (ctx) {
  const postPath = String.raw\`${postPath}\` 
  const meta = await getPostMetaByFilePath(postPath)
  return {
    props: {
      meta: {
        ...meta,
        prevMeta: meta.prev !== undefined && await getPostMetaByFilePath(path.join(postPath, '..', meta.prev)),
        nextMeta: meta.next !== undefined && await getPostMetaByFilePath(path.join(postPath, '..', meta.next))
      }
    }
  }
}
`
}