import {ReactNode} from "react";
import {XDeanIcon} from "./XDeanIcon";
import {GithubIcon} from "./GithubIcon";


type Props = {
  icon: ReactNode
  title: string
  repo: string
}

export const AppBar = (props: Props) => {
  const {icon, title, repo} = props
  return (
    <div className={'w-full shadow-md p-2 border-b bg-white z-10 flex flex-row items-center'}>
      <div className={'flex flex-row items-center justify-center'}>
        {icon}
      </div>
      <div className={'ml-2 text-3xl md:text-4xl'}>
        {title}
      </div>
      <div className={'flex-grow w-0'}/>
      <div className={'flex-row items-center hidden md:flex'}>
        <XDeanIcon/>
        <div className={'mr-1'}/>
        <GithubIcon repo={repo}/>
      </div>
    </div>
  )
}