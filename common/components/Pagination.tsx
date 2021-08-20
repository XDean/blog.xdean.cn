import clsx from 'clsx'
import css from './Pagination.module.css'
import Link from 'next/link'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAngleDoubleLeft, faAngleDoubleRight} from "@fortawesome/free-solid-svg-icons";

type Props = {
  totalPage: number
  pageLink: (page: number) => string
  page?: number
  visiblePage?: number
}

export const Pagination = (props: Props) => {
  let {
    totalPage,
    pageLink,
    page = 0,
    visiblePage = 2,
  } = props
  if (visiblePage * 2 + 3 > totalPage) {
    visiblePage = totalPage
  }
  return (
    <nav className="relative flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
      <Link href={pageLink(0)}>
        <a className={clsx(css.first, css.link)} title={'第一页'}>
          <FontAwesomeIcon icon={faAngleDoubleLeft}/>
        </a>
      </Link>
      {page > visiblePage && (
        <a className={css.link} href={pageLink(0)}>
          1
        </a>
      )}
      {page > visiblePage + 1 && (
        <a className={css.link} href={pageLink(page - visiblePage - 1)}>
          ...
        </a>
      )}
      {Array.from(Array(visiblePage * 2 + 1).keys())
        .map(e => e + page - visiblePage)
        .filter(e => e >= 0 && e < totalPage)
        .map((e, i) => (
          <a className={clsx(css.link, e === page && css.current)}
             href={pageLink(e)}
             key={i}>
            {e + 1}
          </a>
        ))}
      {page < totalPage - visiblePage - 2 && (
        <a className={css.link} href={pageLink(page + visiblePage + 1)}>
          ...
        </a>
      )}
      {page < totalPage - visiblePage - 1 && (
        <a className={css.link} href={pageLink(totalPage - 1)}>
          {totalPage}
        </a>
      )}
      <Link href={pageLink(totalPage - 1)}>
        <a className={clsx(css.link, css.last)}>
          <FontAwesomeIcon icon={faAngleDoubleRight}/>
        </a>
      </Link>
    </nav>
  )
}