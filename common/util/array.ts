export async function toArray<T>(iterator: AsyncGenerator<T>) {
  const arr = []
  for await (const entry of iterator) {
    arr.push(entry)
  }
  return arr
}