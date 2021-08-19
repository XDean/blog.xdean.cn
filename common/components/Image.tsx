import NextImage, {ImageProps} from 'next/image'

type Props = Omit<ImageProps, 'width' | 'height'> & {
  maxWidth?: number
  width?: number
}

export const Image = (props: Props) => {
  const {
    maxWidth = 600,
    width,
    ...rest
  } = props
  return (
    <div style={{maxWidth: maxWidth, width: width}}>
      <NextImage layout={"responsive"} {...rest}/>
    </div>
  )
}

export default Image