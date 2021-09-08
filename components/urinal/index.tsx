import {useEffect, useState} from "react";

export const Urinal = () => {
  const [count, setCount] = useState(5)
  const [history, setHistory] = useState([[0]])
  const onNext = () => {
    const current = history[0]
    let idx: number
    if (current[0] === 0) {
      idx = 0
    } else if (current[current.length - 1] === 0) {
      idx = current.length - 1
    } else {
      let last = 0
      const distance = new Array<number>(current.length).fill(current.length)
      current.forEach((value, index) => {
        if (value === 1) {
          for (let i = last + 2; i < index; i++) {
            distance[i] = Math.min(index - i, distance[i])
          }
          distance[index] = 0
          last = index
        } else {
          distance[index] = index - last
        }
      })
      const max = distance.reduce((a, b) => a > b ? a : b)
      if (max <= 1) {
        return
      }
      idx = distance.indexOf(max);
    }
    const next = [...current]
    next[idx] = 1
    setHistory(h => [next, ...h])
  }
  const onPrevious = () => {
    if (history.length > 1) {
      setHistory(history.slice(1))
    }
  }
  useEffect(() => {
    setHistory([new Array<number>(count).fill(0)])
  }, [count])
  return (
    <div className={'border w-max p-2 rounded shadow max-w-[90%]'}>
      <div className={'space-x-2'}>
        池数:
        <input className={'border-b w-12 px-1'}
               value={count}
               onChange={e => setCount(Math.min(100, Number(e.target.value)))}
               type={'number'}/>
        <button onClick={onPrevious}
                className={'btn'}>
          上一步
        </button>
        <button onClick={onNext}
                className={'btn'}>
          下一步
        </button>
        <span>
          人数：{history[0].filter(e => e === 1).length}
        </span>
      </div>
      <div className={'font-mono text-xl space-x-1 w-max max-w-full mx-auto mt-2'}>
        {history[0].map((e, i) => (
          <div key={i} className={'inline-block'}>
            {e ? 'X' : 'O'}
          </div>
        ))}
      </div>
    </div>
  )
}