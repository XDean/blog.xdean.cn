export type TaxLevel = {
  range: [number, number]
  rate: number
  quick: number
}

export type BaoXian = {
  name: string,
  rate: number,
  base: number | [number, number],
}

export type TaxInput = {
  income: {
    perMonth: number
    month: number
    other: number
    bonus: number
    month13: boolean
  }
  baoXian: BaoXian[]
  gjj: BaoXian
  zhuanXiang: number
  useBonusTax: boolean
  useBonusTax13: boolean
}

export type TaxResult = {
  month: number
  income: {
    salary: number
    bonus: number
    total: number
  }
  baoXian: {
    name: string
    base: number
    rate: number
    perMonth: number
    total: number
  }[]
  gjj: {
    base: number
    rate: number
    perMonth: number
    total: number
  }
  tax: {
    salary: {
      origin: number
      cut: {
        baoXian: number
        zhuanXiang: number
        threshold: number
      }
      base: number
      level: TaxLevel
      tax: number
    }
    bonus: {
      origin: number
      diff: number
      base: number
      level: TaxLevel
      tax: number
    }
  }
  total: {
    income: number
    baoxian: number
    gjj: number
    tax: number
    cash: number
  }
}