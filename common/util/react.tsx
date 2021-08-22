import {ComponentType, FunctionComponent} from "react";

export function notSSR<T, >(Comp: ComponentType<T>): FunctionComponent<T> {
  return (props: T) => {
    if (typeof window !== 'undefined') {
      return <Comp {...props}/>
    } else {
      return null
    }
  }
}