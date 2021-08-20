import clsx from 'clsx'

type Props = {
  text: string
  className?: string
}

export const Tag = (props: Props) => {
  const {text, className} = props
  return (
    <div
      className={clsx('text-xs inline-flex items-center leading-sm px-2 py-0.5 rounded-full',
        'bg-white text-gray-700 border border-gray-300',
        className)}>
      {text}
    </div>
  )
}