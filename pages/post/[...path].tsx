import {GetStaticPaths, GetStaticProps} from 'next'
import {getAllPostMetas, getPostMetaByUrlPath} from "../../src/api";
import {PostMetaNormalize} from "../../src/domain";

type PostProps = {
  meta: PostMetaNormalize
}

type Params = {
  path: string[]
}

const Post = (props: PostProps) => {
  console.log(props)
  return (
    <div>

    </div>
  )
}

export const getStaticProps: GetStaticProps<PostProps, Params> = async ctx => {
  const meta = await getPostMetaByUrlPath(ctx.params!.path.join('/'))
  return {
    props: {
      meta:meta,
    },
  }
}

export const getStaticPaths: GetStaticPaths<Params> = async () => {
  const metas = await getAllPostMetas()
  return {
    paths: metas.map(m => {
      return ({
        params: {
          path: m.link.split('/')
        }
      });
    }),
    fallback: false,
  }
}


export default Post