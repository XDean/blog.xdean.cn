import React from "react";
import {Badge} from "./Badge";

type Props = {
  total?: number
  loading?: boolean
}

export const Read = (props: Props) => {
  const {total, loading} = props
  return (
    <Badge left={'👋‍️阅读'}
           right={total}
           loading={loading}
           tooltip={'阅读量'}/>
  )
}