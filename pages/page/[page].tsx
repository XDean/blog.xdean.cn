import {GetStaticPaths, GetStaticProps} from 'next'
import {PostMeta} from "src/domain";
import {PostPageView} from "src/components/page/PostPageView";
import {getAllPostMetas, getPostByPage} from "src/service";
import {CONSTANT} from "src/constants";
import {range} from "common/util/array";
import {Page} from 'common/util/page'

type Props = {
  data: Page<PostMeta>
}

type Params = {
  page: string
}

export default function View(props: Props) {
  return (
    <PostPageView page={props.data}/>
  )
}

export const getStaticProps: GetStaticProps<Props, Params> = async ctx => {
  const pageNumber = Number(ctx.params!.page);
  const data = await getPostByPage(pageNumber)
  return {
    props: {
      data
    }
  }
}

export const getStaticPaths: GetStaticPaths<Params> = async () => {
  const metas = await getAllPostMetas()
  const totalPage = Math.ceil(metas.length / CONSTANT.pageSize)
  return {
    paths: range(0, totalPage).map(p => ({params: {page: (p + 1).toString()}})),
    fallback: false,
  }
}