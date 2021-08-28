import NextImage, {ImageProps} from 'next/image'
import clsx from "clsx";
import {useRouter} from "next/router";

type Props = Omit<ImageProps, 'width' | 'height' | 'src'> & {
  maxWidth?: number | string
  width?: number | string
  src: Exclude<ImageProps['src'], string>
}

export const Image = (props: Props) => {
  const {
    maxWidth = 600,
    width,
    className,
    ...rest
  } = props
  const router = useRouter()
  const routerLoading = router && router.query._image_loading;
  const loading = (routerLoading === 'lazy' || routerLoading === 'eager') ? routerLoading : undefined
  return (
    <div style={{maxWidth: maxWidth, width: width}} className={clsx('image-wrapper', className)}>
      <NextImage layout={"responsive"} loading={loading} {...rest}/>
    </div>
  )
}

export default Image