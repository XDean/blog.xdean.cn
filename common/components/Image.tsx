import NextImage, {ImageProps} from 'next/image'

type Props = Omit<ImageProps, 'width' | 'height'> & {
  width?: number
}

export const Image = (props: Props) => {
  const {
    width = 600,
    ...rest
  } = props
  return (
    <div style={{maxWidth: width}}>
      <NextImage layout={"responsive"} {...rest}/>
    </div>
  )
}