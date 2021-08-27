import {format} from "date-fns";
import {Tag} from "common/components/Tag";
import React, {useCallback} from "react";
import {PostMeta} from "src/domain";
import useSWR from "swr";
import {Like} from "../../../common/components/Like";
import {Read} from "../../../common/components/button/Read";

export type Props = {
  meta: PostMeta
}

type LikeState = {
  total: number
  you: number
}

export const PostHeader = ({meta}: Props) => {
  const like = useSWR<LikeState>(`/api/like?postId=${meta.path}`)

  const onLike = useCallback(() => {
    fetch(`/api/like?postId=${meta.path}&value=${(like.data?.you || 0) === 0}`, {
      method: 'POST'
    })
      .then(() => like.mutate())
    like.mutate(l => l === undefined ? {total: 1, you: 1} : ({
      total: l.you ? l.total - 1 : l.total + 1,
      you: 1 - l.you,
    }), false)
  }, [like, meta])

  const onPrint = () => {
    const iframe = document.createElement("iframe");

    function closePrint() {
      document.body.removeChild(iframe);
    }

    function setPrint() {
      if (iframe.contentWindow) {
        iframe.contentWindow.onbeforeunload = closePrint;
        iframe.contentWindow.onafterprint = closePrint;
        iframe.contentWindow.focus();
        iframe.contentWindow.print();
      }
    }

    iframe.onload = setPrint;
    iframe.style.position = "fixed";
    iframe.style.right = "0";
    iframe.style.bottom = "0";
    iframe.style.width = "0";
    iframe.style.height = "0";
    iframe.style.border = "0";
    iframe.src = `${window.location.href}?layout=false&print=true`;
    document.body.appendChild(iframe);
  }

  return (
    <div id={'title'}>
      <div className={'space-x-2'}>
        <span className={'text-2xl md:text-4xl'}>
          {meta.title}
        </span>
        <div className={'inline-block'}>
          <Read total={'loading'}/>
        </div>
        {like.data && (
          <div className={'inline-block'}>
            <Like total={like.data.total} like={like.data.you > 0} onLike={onLike}/>
          </div>
        )}
        <div onClick={onPrint}
             className={'inline-block rounded border hover:bg-blue-200 cursor-pointer p-1'}
             title={'打印/保存为PDF'}
        >
          🖨️
        </div>
      </div>
      <div className={'mt-2 ml-0.5 flex items-center space-x-1'}>
        <div>
          {format(meta.date, 'yyyy-MM-dd')}
        </div>
        {meta.categories.map(c => <Tag key={c} text={c}/>)}
        {meta.tags.map(c => <Tag key={c} text={c}/>)}
      </div>
      <div>
      </div>
    </div>
  )
}