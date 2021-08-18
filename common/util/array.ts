export async function toArray<T>(iterator: AsyncGenerator<T>) {
  const arr = []
  for await (const entry of iterator) {
    arr.push(entry)
  }
  return arr
}

export function range(start: number, end: number) {
  return Array.from(new Array(end - start).keys()).map(e => e + start)
}