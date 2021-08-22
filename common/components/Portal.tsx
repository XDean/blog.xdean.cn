import {PropsWithChildren, useEffect, useMemo} from "react";
import ReactDOM from "react-dom";
import {notSSR} from "../util/react";

type Props = PropsWithChildren<{
  as?: keyof HTMLElementTagNameMap
  parent?: HTMLElement
}>
export const Portal = notSSR((props: Props) => {
  const {
    children,
    as = 'div',
    parent = document.body
  } = props
  const element = useMemo((() => document.createElement(as)), [as])
  useEffect(() => {
    parent.appendChild(element)
    return () => {
      parent.removeChild(element)
    }
  }, [parent, element])
  return ReactDOM.createPortal(children, element)
})