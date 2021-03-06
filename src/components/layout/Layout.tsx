import {PropsWithChildren} from "react";
import {AppBar} from "common/components/AppBar";
import {Footer} from "../../../common/components/Footer";
import {CONSTANT} from "../../constants";

type Props = PropsWithChildren<{}>

export const Layout = (props: Props) => {
  const {children} = props
  return (
    <div>
      <nav className={'sticky top-0 z-40'}>
        <AppBar icon={''} title={'XDean的博客'} repo={CONSTANT.repo}/>
      </nav>
      <main className={'mt-4'}>
        {children}
      </main>
      <Footer className={'w-10/12 mt-4 mb-8 mx-auto'}/>
    </div>
  )
}