module.exports = async function (src) {
  return `import {PostView} from 'src/components/PostView'

${src}

export default ({ children }) => <PostView meta={meta}>{children}</PostView>
`
}