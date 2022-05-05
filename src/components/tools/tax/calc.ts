import {TAX_THRESHOLD, TaxMonthLevels} from './data';
import {BaoXian, TaxInput, TaxResult} from './types';

function calcBaoXian(e: BaoXian, perMonthSalary: number, month: number) {
  const base = typeof e.base == 'number' ? e.base
    : Math.min(e.base[1], Math.max(e.base[0], perMonthSalary));
  const perMonth = base * e.rate * 0.01;
  return {
    name: e.name,
    base: base,
    rate: e.rate,
    perMonth: perMonth,
    total: perMonth * month,
  };
}

export function calcTax(param: TaxInput): TaxResult {
  const {income: salary, useBonusTax, oneMonthToBonus} = param;
  const totalSalary = salary.perMonth * salary.month + salary.other;
  const income: TaxResult['income'] = {
    salary: totalSalary,
    bonus: salary.bonus,
    total: totalSalary + salary.bonus,
  };
  const month = Math.min(param.income.month, 12);
  const bx: TaxResult['baoXian'] = param.baoXian.map(e => calcBaoXian(e, salary.perMonth, month));
  const gjj: TaxResult['gjj'] = calcBaoXian(param.gjj, salary.perMonth, month);

  const taxOrigin = income.salary + (useBonusTax ? 0 : income.bonus) - (oneMonthToBonus ? salary.perMonth : 0);
  const baoXianTotal = bx.reduce((a, b) => a + b.total, 0);
  const zhuanXiangCut = param.zhuanXiang * month;
  const thresholdCut = TAX_THRESHOLD * 12;
  const taxBase = Math.max(0, taxOrigin - baoXianTotal - gjj.total - zhuanXiangCut - thresholdCut);
  const taxLevel = TaxMonthLevels.find(e => e.range[0] * 12 <= taxBase && e.range[1] * 12 > taxBase)!;
  const tax = taxBase * taxLevel.rate * 0.01 - taxLevel.quick * 12;

  const bonusOrigin = (useBonusTax ? income.bonus : 0) + (oneMonthToBonus ? salary.perMonth : 0);
  const bonusDiff = Math.max(0, TAX_THRESHOLD - salary.perMonth);
  const bonusBase = Math.max(0, bonusOrigin / 12 - bonusDiff);
  const bonusLevel = TaxMonthLevels.find(e => e.range[0] <= bonusBase && e.range[1] > bonusBase)!;
  const bonusTax = Math.max(0, bonusOrigin - bonusDiff) * bonusLevel.rate * 0.01 - bonusLevel.quick;

  return {
    month,
    income: income,
    baoXian: bx,
    gjj: gjj,
    tax: {
      salary: {
        origin: taxOrigin,
        cut: {
          baoXian: baoXianTotal,
          zhuanXiang: zhuanXiangCut,
          threshold: thresholdCut,
        },
        base: taxBase,
        level: taxLevel,
        tax: tax,
      },
      bonus: {
        origin: bonusOrigin,
        diff: bonusDiff,
        base: bonusBase,
        level: bonusLevel,
        tax: bonusTax,
      },
    },
    total: {
      income: income.total,
      baoxian: bx.reduce((a, b) => a + b.total, 0),
      gjj: gjj.total,
      tax: tax + bonusTax,
      cash: income.total - baoXianTotal - gjj.total - tax - bonusTax,
    },
  };
}