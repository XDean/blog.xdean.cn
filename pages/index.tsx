import {GetStaticProps} from 'next'

export default function Page(){
  return null
}

export const getStaticProps: GetStaticProps = async () => {
  return {
    redirect: {
      statusCode: 303,
      destination: '/page/1',
    },
  }
}