import React, {PropsWithChildren, useEffect, useRef} from "react";
import css from './ProgressToc.module.css'

type TocItem = {
  listItem: HTMLLIElement
  anchor: HTMLAnchorElement
  target: HTMLElement
  pathStart: number
  pathEnd: number
}

// See https://github.com/hakimel/css/tree/master/progress-nav
// children must be list
export const ProgressToc = ({children}: PropsWithChildren<{}>) => {
  const tocRef = useRef<HTMLDivElement>(null)
  const pathRef = useRef<SVGPathElement>(null)

  useEffect(() => {
    if (!tocRef.current || !pathRef.current) {
      return
    }
    const toc = tocRef.current
    const tocPath = pathRef.current

    let tocItems: TocItem[]
    let pathLength: number
    let lastPathStart: number
    let lastPathEnd: number

    function drawPath() {
      tocItems = Array.from(toc.querySelectorAll('li'))
        .map(item => {
          const anchor = item.querySelector('a')!
          const target = document.getElementById(decodeURI(anchor.getAttribute('href')!).slice(1))!
          return {
            listItem: item,
            anchor: anchor,
            target: target,
            pathStart: 0,
            pathEnd: 0,
          } as TocItem
        })
        .filter(item => !!item.target)
      const path: (string | number)[] = []
      let pathIndent: number

      tocItems.forEach((item, i) => {
        const x = item.listItem.offsetLeft - 5
        const y = item.listItem.offsetTop
        const height = item.listItem.offsetHeight

        if (i === 0) {
          path.push('M', x, y, 'L', x, y + height);
          item.pathStart = 0;
        } else {
          if (pathIndent !== x) path.push('L', pathIndent, y);
          path.push('L', x, y);
          tocPath.setAttribute('d', path.join(' '));
          item.pathStart = tocPath.getTotalLength() || 0;
          path.push('L', x, y + height);
        }
        pathIndent = x;
        tocPath.setAttribute('d', path.join(' '));
        item.pathEnd = tocPath.getTotalLength();
      })
      pathLength = tocPath.getTotalLength()
      sync()
    }

    function sync() {
      const windowHeight = window.innerHeight;

      let pathStart = pathLength
      let pathEnd = 0

      let visibleItems = 0
      let lastItem

      function activateItem(item: TocItem) {
        pathStart = Math.min(item.pathStart, pathStart);
        pathEnd = Math.max(item.pathEnd, pathEnd);
        visibleItems += 1;
        item.listItem.classList.add(css.visible);
      }

      function deactivateItem(item: TocItem) {
        item.listItem.classList.remove(css.visible);
      }

      tocItems.forEach((item, i) => {
        const targetBounds = item.target.getBoundingClientRect();
        if (targetBounds.bottom > 0 && targetBounds.top < windowHeight) {
          activateItem(item)
          if (i > 0 && targetBounds.top > windowHeight * 0.2) {
            activateItem(tocItems[i - 1])
          }
        } else {
          deactivateItem(item)
          if (targetBounds.top < windowHeight) {
            lastItem = item
          }
        }
      });
      if (visibleItems == 0 && !!lastItem) {
        activateItem(lastItem)
      }
      if (visibleItems > 0 && pathStart < pathEnd) {
        if (pathStart !== lastPathStart || pathEnd !== lastPathEnd) {
          tocPath.setAttribute('stroke-dashoffset', '1');
          tocPath.setAttribute('stroke-dasharray', '1, ' + pathStart + ', ' + (pathEnd - pathStart) + ', ' + pathLength);
          tocPath.setAttribute('opacity', '1');
        }
      } else {
        tocPath.setAttribute('opacity', '0');
      }
      lastPathStart = pathStart;
      lastPathEnd = pathEnd;
    }


    window.addEventListener('resize', drawPath, false);
    window.addEventListener('scroll', sync, false);

    drawPath();
    console.log('update')
    return () => {
      window.removeEventListener('resize', drawPath, false)
      window.removeEventListener('scroll', sync, false)
    }
  }, [tocRef, pathRef])

  return (
    <nav className={css.toc}>
      <div ref={tocRef}>
        {children}
      </div>
      <svg className={css.marker}
           width="200"
           height="200"
           xmlns="http://www.w3.org/2000/svg">
        <path ref={pathRef}
              stroke="#444"
              fill="transparent"
              strokeWidth="3"
              strokeDasharray="0, 0, 0, 1000"
              strokeLinecap="round"
              strokeLinejoin="round"
              transform="translate(-0.5, -0.5)"/>
      </svg>
    </nav>
  )
}