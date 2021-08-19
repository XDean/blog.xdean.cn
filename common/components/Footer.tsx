import clsx from "clsx";

type Props = {
  className?: string
}
export const Footer = (props: Props) => {
  const {className} = props
  return (
    <div className={clsx('mb-8 border-t text-center', className)}>
      <div className={'text-sm mt-1'}>
        Copyright © 2020-{new Date().getFullYear()} Dean Xu. All Rights reserved.
      </div>
    </div>
  )
}