module.exports = async function (src) {
  return `import {PostView} from 'src/components/post/PostView'

${src}

export default ({children, meta}) => {
  return (
    <PostView meta={meta}>
      {children}
    </PostView>
  )
}
`
}