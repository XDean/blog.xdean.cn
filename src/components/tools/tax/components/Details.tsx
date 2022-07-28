import {observer} from 'mobx-react-lite';
import {FC} from 'react';
import css from '../calculator.module.css';
import {TAX_THRESHOLD} from '../data';
import {Tax} from '../tax';

type Props = {
  tax: Tax
}

export const Details: FC<Props> = observer((
  {
    tax,
  },
) => {
  return (
    <div>
      <div className={css.h2}>税收明细</div>
      <ul>
        <li>
          收入
          <ul>
            <li>综合: {format(tax.totalSalary)}</li>
            <li>奖金: {format(tax.totalBonus)}</li>
            <li>共计: {format(tax.totalIncome)}</li>
          </ul>
        </li>
        <li>
          扣除(每月)
          <ul>
            <li>保险</li>
            <ul>
              <li>医疗: {format(tax.yiLiaoBase)} * {tax.baoxian.yiliaoRate}% = {format(tax.monthYiLiao)}</li>
              <li>养老: {format(tax.yangLaoBase)} * {tax.baoxian.yanglaoRate}% = {format(tax.monthYangLao)}</li>
              <li>失业: {format(tax.shiyeBase)} * {tax.baoxian.shiyeRate}% = {format(tax.monthShiye)}</li>
              <li>共计: {format(tax.monthBaoXian)}</li>
            </ul>
            <li>公积金: {format(tax.gjjBase)} * {tax.baoxian.gjjRate}% = {format(tax.monthGjj)}</li>
            <li>专项扣除: {format(tax.monthZhuanXiang)}</li>
            <li>共计: {format(tax.monthBaoXian + tax.monthGjj + tax.monthZhuanXiang)}</li>
            <li>年共计: {format(tax.monthCut)} * {tax.workMonth} = {format(tax.totalCut)}</li>
          </ul>
        </li>
        <li>
          税收
          <ul>
            <li>综合所得
              <ul>
                <li>总计: {format(tax.totalSalary)}</li>
                <li>应税额: {format(tax.totalSalary)} - {TAX_THRESHOLD * 12}
                  {''} - {format(tax.totalCut)} = {format(tax.salaryTaxBase)}</li>
                <li>税档: {tax.salaryTaxLevel.rate}%</li>
                <li>税额: {format(tax.salaryTaxBase)} * {tax.salaryTaxLevel.rate}%
                  {''} - {tax.salaryTaxLevel.quick * 12} = {format(tax.salaryTax)}</li>
              </ul>
            </li>
            <li>
              一次性所得
              <ul>
                <li>总计: {format(tax.totalBonus)}</li>
                <li>应税额(月): {format(tax.bonusTaxBase)}</li>
                <li>税档: {tax.bonusTaxLevel.rate}%</li>
                <li>税额: {format(tax.totalBonus)} * {tax.bonusTaxLevel.rate}%
                  {''} - {tax.bonusTaxLevel.quick} = {format(tax.bonusTax)}</li>
              </ul>
            </li>
            <li>总计: {format(tax.totalTax)}</li>
          </ul>
        </li>
        <li>
          可支配收入
          <ul>
            <li>现金: {format(tax.finalCash)}</li>
            <li>公积金: {format(tax.totalGjj)}</li>
            <li>共计: {format(tax.finalUsable)}</li>
          </ul>
        </li>
      </ul>
    </div>
  );
});


const format = (v: number) => v.toLocaleString('en', {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});