import {DetailedHTMLProps, Fragment, InputHTMLAttributes, useMemo, useState} from 'react';
import {calcTax} from './calc';
import css from './calculator.module.css';
import {DEFAULT_BAO_XIAN, DEFAULT_GONG_JI_JIN, SALARY_STATS, TAX_THRESHOLD} from './data';
import {TaxInput} from './types';

export const TaxCalculator = () => {
  const [config, setConfig] = useState<TaxInput>(() => ({
    income: {
      perMonth: 10000,
      month: 12,
      other: 0,
      bonus: 30000,
    },
    baoXian: DEFAULT_BAO_XIAN,
    gjj: DEFAULT_GONG_JI_JIN,
    zhuanXiang: 0,
    useBonusTax: true,
  }));
  const {income, baoXian, gjj, zhuanXiang, useBonusTax} = config;
  const result = useMemo(() => calcTax(config), [config]);
  const baoXianPerMonth = result.baoXian.reduce((a, b) => a + b.perMonth, 0);
  return (
    <div className={css.root}>
      <div>
        <div className={css.h1}>个税计算器</div>
        <ul>
          <li>由于社保基数按上月薪资浮动，会与实际情况有偏差</li>
          <li>社保基数上下限采用深圳2021年7月数据，最低工资{SALARY_STATS.min}，全省平均工资{SALARY_STATS.gdAvg}，深圳平均工资{SALARY_STATS.szAvg}</li>
          <li>数据结果仅供参考，如有BUG，欢迎评论指正</li>
        </ul>
      </div>
      <div className={css.inputContainer}>
        <div>
          <div className={css.h2}>收入</div>
          <div className={css.form_table}>
            <div>
              月薪:
            </div>
            <Input value={income.perMonth}
                   type={'number'}
                   unit={'元'}
                   onChange={e => setConfig(s => ({...s, income: {...s.income, perMonth: Number(e.target.value)}}))}/>
            <div>
              月数:
            </div>
            <Input value={income.month}
                   type={'number'}
                   onChange={e => setConfig(s => ({...s, income: {...s.income, month: Number(e.target.value)}}))}/>
            <div>
              其他所得:
            </div>
            <Input value={income.other}
                   type={'number'}
                   unit={'元'}
                   onChange={e => setConfig(s => ({...s, income: {...s.income, other: Number(e.target.value)}}))}/>
            <div>
              年终奖:
            </div>
            <Input value={income.bonus}
                   type={'number'}
                   unit={'元'}
                   onChange={e => setConfig(s => ({...s, income: {...s.income, bonus: Number(e.target.value)}}))}/>
          </div>
        </div>
        <div>
          <div className={css.h2}>保险</div>
          <div className={css.form_table}>
            {baoXian.map(e => (
              <Fragment key={e.name}>
                <div>{e.name}:</div>
                <Input value={e.rate}
                       unit={'%'}
                       type={'number'}
                       readOnly/>
              </Fragment>
            ))}
            <div>公积金:</div>
            <Input value={gjj.rate}
                   type={'number'}
                   unit={'%'}
                   onChange={e => setConfig(v => ({
                     ...v,
                     gjj: {
                       ...v.gjj,
                       rate: Number(e.target.value),
                     },
                   }))}/>
          </div>
        </div>
        <div>
          <div className={css.h2}>税收</div>
          <div className={css.form_table}>
            <div>
              起征点:
            </div>
            <Input unit={'元'}
                   type={'number'}
                   value={TAX_THRESHOLD}
                   readOnly={true}/>
            <div>专项扣除:</div>
            <Input value={zhuanXiang}
                   type={'number'}
                   unit={'元'}
                   onChange={e => setConfig(v => ({...v, zhuanXiang: Number(e.target.value)}))}/>
            <div>年终奖单独计税:</div>
            <input type={'checkbox'}
                   checked={useBonusTax}
                   className={'w-4 h-4 !m-1'}
                   onChange={e => setConfig(v => ({...v, useBonusTax: e.target.checked}))}
            />
          </div>
        </div>
      </div>
      <div className={css.resultContainer}>
        <table className={css.resultTable}>
          <caption className={css.h2}>税收总览</caption>
          <tbody>
          <tr>
            <td>总收入:</td>
            <td>
              <Yuan value={result.total.income}/>
            </td>
          </tr>
          <tr>
            <td>保险:</td>
            <td>
              <Yuan value={result.total.baoxian}/>
            </td>
          </tr>
          <tr>
            <td>公积金:</td>
            <td>
              <Yuan value={result.total.gjj}/>
            </td>
          </tr>
          <tr>
            <td>个税:</td>
            <td>
              <Yuan value={result.total.tax}/>
            </td>
          </tr>
          <tr>
            <td>现金:</td>
            <td>
              <Yuan value={result.total.cash}/>
            </td>
          </tr>
          <tr>
            <td>可支配:</td>
            <td>
              <Yuan value={result.total.cash + result.total.gjj}/>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
      <div>
        <div className={css.h2}>税收明细</div>
        <ul>
          <li>
            收入
            <ul>
              <li>薪资: {format(config.income.perMonth)} * {config.income.month} + {format(config.income.other)} = {format(result.income.salary)}</li>
              <li>奖金: {format(config.income.bonus)}</li>
              <li>共计: {format(result.total.income)}</li>
            </ul>
          </li>
          <li>
            扣除(每月)
            <ul>
              <li>保险</li>
              <ul>
                {result.baoXian.map(e => (
                  <li key={e.name}>{e.name}: {format(e.base)} * {e.rate}% = {format(e.perMonth)}</li>
                ))}
                <li>共计: {format(baoXianPerMonth)}</li>
              </ul>
              <li>公积金: {format(result.gjj.base)} * {result.gjj.rate}% = {format(result.gjj.perMonth)}</li>
              <li>起征点: {format(TAX_THRESHOLD)}</li>
              <li>共计: {format(baoXianPerMonth + result.gjj.perMonth + TAX_THRESHOLD)}</li>
            </ul>
          </li>
          <li>
            税收
            <ul>
              <li>综合所得
                <ul>
                  <li>总计: {format(result.tax.salary.origin)}</li>
                  <li>应税额: {format(result.tax.salary.origin)} - {format(baoXianPerMonth + result.gjj.perMonth + TAX_THRESHOLD)} *
                    12 = {format(result.tax.salary.base)}</li>
                  <li>税档: {result.tax.salary.level.rate}%</li>
                  <li>税额: {format(result.tax.salary.tax)}</li>
                </ul>
              </li>
              {result.tax.bonus.origin > 0 && (
                <li>
                  一次性所得
                  <ul>
                    <li>总计: {format(result.tax.bonus.origin)}</li>
                    <li>应税额(月): {format(result.tax.bonus.base)}</li>
                    <li>税档: {result.tax.bonus.level.rate}%</li>
                    <li>税额: {format(result.tax.bonus.tax)}</li>
                  </ul>
                </li>
              )}
              <li>总计: {format(result.total.tax)}</li>
            </ul>
          </li>
          <li>
            可支配收入
            <ul>
              <li>现金: {format(result.total.cash)}</li>
              <li>公积金: {format(result.total.gjj)}</li>
              <li>共计: {format(result.total.cash + result.total.gjj)}</li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  );
};

const Input = ({unit = '', ...rest}: { unit?: string }
  & DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>) => {
  return (
    <div className={'inline-flex items-center space-x-1'}>
      <input {...rest}/>
      <div>{unit}</div>
    </div>
  );
};

const Yuan = ({value}: { value: number }) => {
  return (
    <div className={'text-right'}>
      {format(value)} 元
    </div>
  );
};

const format = (v: number) => v.toLocaleString('en', {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});