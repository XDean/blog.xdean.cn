import {makeAutoObservable} from 'mobx';
import {toRange} from '../../../../common/util/math';
import {SALARY_STATS, TAX_THRESHOLD, TaxMonthLevels} from './data';

export const BaoXianTypes = ['yanglao', 'yiliao', 'shiye'];
export type BaoXianType = typeof BaoXianTypes[number]

export class Tax {
  monthSalary = 5000;
  month = 12;
  month13 = 1;
  bonusMonth = 2;
  baoxian = {
    yanglao: true,
    yiliao: true,
    shiye: true,
    gjj: true,
    yiliaoLevel: 1,
    yanglaoRate: 8,
    yiliaoRate: 2,
    shiyeRate: 0.3,
    gjjRate: 5,
  };
  monthZhuanXiang = 0;
  useBonusTax: boolean = true;
  useBonusTax13: boolean = true;

  constructor() {
    makeAutoObservable(this);
  }

  get bonus() {
    return this.bonusMonth * this.monthSalary;
  }

  set bonus(v: number) {
    this.bonusMonth = v / this.monthSalary;
  }

  get totalSalary() {
    return this.monthSalary * (this.month + (this.useBonusTax13 ? 0 : this.month13)) + (this.useBonusTax ? 0 : this.bonus);
  }

  get totalBonus() {
    return (this.useBonusTax ? this.bonus : 0) + (this.useBonusTax13 ? this.monthSalary * this.month13 : 0);
  }

  get totalIncome() {
    return this.monthSalary * (this.month + this.month13) + this.bonus;
  }

  get workMonth() {
    return Math.max(0, Math.min(this.month, 12));
  }

  get yangLaoBase() {
    return toRange(this.monthSalary, [SALARY_STATS.min, SALARY_STATS.gdAvg * 3]);
  }

  get monthYangLao() {
    if (this.baoxian.yanglao) {
      return this.yangLaoBase * this.baoxian.yanglaoRate / 100;
    } else {
      return 0;
    }
  }

  get yiLiaoBase() {
    return toRange(this.monthSalary, [SALARY_STATS.szAvg * 0.6, SALARY_STATS.szAvg * 3]);
  }

  get monthYiLiao() {
    if (this.baoxian.yanglao) {
      return this.yiLiaoBase * this.baoxian.yiliaoRate / 100;
    } else {
      return 0;
    }
  }

  get shiyeBase() {
    return SALARY_STATS.min;
  }

  get monthShiye() {
    if (this.baoxian.shiye) {
      return this.shiyeBase * this.baoxian.shiyeRate / 100;
    } else {
      return 0;
    }
  }

  get monthBaoXian() {
    return this.monthShiye + this.monthYiLiao + this.monthYangLao;
  }

  get totalBaoXian() {
    return this.monthBaoXian * this.workMonth;
  }

  get gjjBase() {
    return toRange(this.monthSalary, [SALARY_STATS.min, SALARY_STATS.szAvg * 3]);
  }

  get monthGjj() {
    if (this.baoxian.gjj) {
      return this.gjjBase * this.baoxian.gjjRate / 100;
    } else {
      return 0;
    }
  }

  get totalGjj() {
    return this.monthGjj * this.workMonth;
  }

  get monthCut() {
    return this.monthBaoXian + this.monthGjj + this.monthZhuanXiang;
  }

  get totalCut() {
    return this.monthCut * this.workMonth;
  }

  get taxYearThreshold() {
    return TAX_THRESHOLD * 12;
  }

  get salaryTaxBase() {
    return Math.max(0, this.totalSalary - this.taxYearThreshold - this.totalCut);
  }

  get salaryTaxLevel() {
    return TaxMonthLevels.find(e => e.range[0] * 12 <= this.salaryTaxBase && e.range[1] * 12 > this.salaryTaxBase)
      || TaxMonthLevels[0];
  }

  get salaryTax() {
    return this.salaryTaxBase * this.salaryTaxLevel.rate / 100 - this.salaryTaxLevel.quick * 12;
  }

  get bonusTaxBase() {
    return this.totalBonus / 12;
  }

  get bonusTaxLevel() {
    return TaxMonthLevels.find(e => e.range[0] <= this.bonusTaxBase && e.range[1] > this.bonusTaxBase)
      || TaxMonthLevels[0];
  }

  get bonusTax() {
    return this.totalBonus * this.bonusTaxLevel.rate / 100 - this.bonusTaxLevel.quick;
  }

  get totalTax() {
    return this.salaryTax + this.bonusTax;
  }

  get finalCash() {
    return this.totalIncome - this.totalBaoXian - this.totalGjj - this.totalTax;
  }

  get finalUsable() {
    return this.finalCash + this.totalGjj;
  }
}