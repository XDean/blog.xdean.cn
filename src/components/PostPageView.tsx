import {PostMetaNormalize} from "src/domain";
import {Page} from "common/util/page";
import Link from 'next/link'

type Props = {
  data: Page<PostMetaNormalize>
}
export const PostPageView = (props: Props) => {
  return (
    <div>
      {props.data.data.map(e => (
        <Link key={e.link} href={`/posts/${e.link}`}>
          <a>
            {e.title}
          </a>
        </Link>
      ))}
    </div>
  )
}