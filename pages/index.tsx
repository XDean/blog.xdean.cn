import {GetStaticProps} from 'next'
import View, {getStaticPropsShared} from './page/[page]'

export default View

export const getStaticProps: GetStaticProps = async () => {
  return await getStaticPropsShared(1)
}