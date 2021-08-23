import NextImage, {ImageProps} from 'next/image'
import clsx from "clsx";

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
  return (
    <div style={{maxWidth: maxWidth, width: width}} className={clsx('image-wrapper', className)}>
      <NextImage layout={"responsive"} {...rest}/>
    </div>
  )
}

export default Image