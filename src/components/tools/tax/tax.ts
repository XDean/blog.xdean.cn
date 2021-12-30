import {BAO_XIAN, TAX_TABLE, TAX_THRESHOLD} from './data';

export function calcTax(salary: { perMonth: number; other: number; month: number; bonus: number }, baoXian: number[], zhuanXiang: number) {
  const totalSalary = salary.perMonth * salary.month + salary.other;
  const income = {
    salary: totalSalary,
    bonus: salary.bonus,
    total: totalSalary + salary.bonus,
  };
  const bx = BAO_XIAN.map((e, i) => {
    const base = typeof e.base == 'number' ? e.base
      : Math.min(e.base[1], Math.max(e.base[0], salary.perMonth));
    return {
      name: e.name,
      perMonth: base * baoXian[i] * 0.01,
      total: base * baoXian[i] * 0.12,
    };
  });
  const baoXianTotal = bx.reduce((a, b) => a + b.total, 0);
  const zhuanXiangCut = zhuanXiang * 12;
  const taxBase = Math.max(0, income.salary - baoXianTotal - zhuanXiangCut - TAX_THRESHOLD * 12);
  const taxLevel = TAX_TABLE.find(e => e.range[0] * 12 <= taxBase && e.range[1] * 12 > taxBase)!;
  const tax = taxBase * taxLevel.rate * 0.01 - taxLevel.quick * 12;

  const bonusDiff = Math.max(0, TAX_THRESHOLD - salary.perMonth);
  const bonusBase = income.bonus / 12 - bonusDiff;
  const bonusLevel = TAX_TABLE.find(e => e.range[0] <= bonusBase && e.range[1] > bonusBase)!;
  const bonusTax = (income.bonus - bonusDiff) * bonusLevel.rate * 0.01 - bonusLevel.quick;

  return {
    income: income,
    baoXian: bx,
    salaryTax: {
      origin: income.salary,
      baoXian: baoXianTotal,
      zhuanXiang: zhuanXiangCut,
      base: taxBase,
      level: taxLevel,
      tax: tax,
    },
    bonusTax: {
      origin: salary.bonus,
      diff: bonusDiff,
      base: bonusBase,
      level: bonusLevel,
      tax: bonusTax,
    },
    final: {
      income: income.total,
      baoxian: bx.filter(e => e.name !== '公积金').reduce((a, b) => a + b.total, 0),
      gjj: bx.filter(e => e.name === '公积金').reduce((a, b) => a + b.total, 0),
      tax: tax + bonusTax,
      cash: income.total - baoXianTotal - tax - bonusTax,
    },
  };
}