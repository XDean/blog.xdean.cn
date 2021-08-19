import Image from "./Image";
import xdeanLogo from "public/favicon.ico";

type Props = {
  width?: number
}

export const XDeanIcon = (props: Props) => {
  const {width = 36} = props
  return (
    <a target={'_blank'}
       href={'https://xdean.cn'}
       className={'leading-[0px] hover:ring-2 rounded-full'}
    >
      <Image src={xdeanLogo} alt={'XDean Logo'} width={width}/>
    </a>
  )
}