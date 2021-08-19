import clsx from 'clsx'

type Props = {
  text: string
}

export const Tag = (props: Props) => {
  const {text} = props
  return (
    <div
      className={clsx('text-xs inline-flex items-center font-bold leading-sm px-3 py-1 rounded-full',
        'bg-white text-gray-700 border')}>
      {text}
    </div>
  )
}