import React from "react";
import {PostMeta} from "../../domain";

type Props = {
  meta: PostMeta
}
export const PostLinks = (props: Props) => {
  const {meta} = props
  if (!meta.links) {
    return null
  }
  return (
    <div>
      <h2 className={'text-2xl'} id={'related-link'}>
        相关链接
      </h2>
      <ul className={'list-decimal list-inside'}>
        {meta.links?.map((e, i) => (
          <li key={i}>
            <a href={e.link} className={'hover:underline'}>
              {e.name}
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}