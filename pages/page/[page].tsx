import {GetStaticPaths, GetStaticProps} from 'next'
import {PostMeta} from "src/domain";
import {PostPageView} from "src/components/page/PostPageView";
import {getAllPostMetas} from "src/api";
import {CONSTANT} from "src/constants";
import {range} from "common/util/array";
import {getPage, Page} from 'common/util/page'

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
  const metas = await getAllPostMetas()
  const pageNumber = Number(ctx.params!.page);
  const pageData = getPage(metas, pageNumber, CONSTANT.pageSize)
  if (pageData === null) {
    return {
      notFound: true
    }
  }
  return {
    props: {
      data: pageData
    },
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