import {DetailedHTMLProps, Fragment, InputHTMLAttributes, useMemo, useState} from 'react';
import {calcTax} from './calc';
import css from './calculator.module.css';
import {DEFAULT_BAO_XIAN, DEFAULT_GONG_JI_JIN, TAX_THRESHOLD} from './data';
import {TaxInput} from './types';


export const TaxCalculator = () => {
  const [config, setConfig] = useState<TaxInput>(() => ({
    income: {
      perMonth: 10000,
      month: 12,
      other: 0,
      bonus: 0,
    },
    baoXian: DEFAULT_BAO_XIAN,
    gjj: DEFAULT_GONG_JI_JIN,
    zhuanXiang: 0,
    useBonusTax: true,
  }));
  const {income, baoXian, gjj, zhuanXiang, useBonusTax} = config;
  const result = useMemo(() => calcTax(config), [config]);
  return (
    <div className={css.root}>
      <div>
        <div className={css.h1}>个税计算器</div>
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
      <pre>
        {JSON.stringify(result, null, '  ')}
      </pre>
    </div>
  );
};

const Input = ({
                 unit = '',
                 ...rest
               }: { unit?: string } & DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>) => {
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
      {value.toLocaleString('en', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })} 元
    </div>
  );
};