export type Page<T> = {
  total: number
  page: number // 1 based
  first: boolean
  last: boolean
  data: T[]
}

export function getPage<T>(arr: T[], page: number, size: number): Page<T> | null {
  const maxPage = Math.ceil(arr.length / size)
  if (isNaN(page) || page < 1 || page > maxPage) {
    return null
  }
  const data = arr.slice((page - 1) * size, Math.min(page * size, arr.length))
  return {
    page: page,
    total: maxPage,
    first: page === 1,
    last: page === maxPage,
    data: data,
  }
}
