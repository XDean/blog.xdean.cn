import {DetailedHTMLProps, Fragment, InputHTMLAttributes, useMemo, useState} from 'react';
import css from './calculator.module.css';
import {BAO_XIAN, TAX_THRESHOLD} from './data';
import {calcTax} from './tax';


export const TaxCalculator = () => {
  const [salary, setSalary] = useState(() => ({
    perMonth: 10000,
    month: 12,
    other: 0,
    bonus: 0,
  }));
  const [baoXian, setBaoXian] = useState<number[]>(() => BAO_XIAN.map(e => e.rate));
  const [zhuanXiang, setZhuanXiang] = useState(0);
  const result = useMemo(() => calcTax(salary, baoXian, zhuanXiang),
    [salary, baoXian, zhuanXiang]);
  return (
    <div className={css.root}>
      <div>
        <div className={css.h1}>个税计算器</div>
      </div>
      <div className={css.content}>
        <div>
          <div className={css.h2}>收入</div>
          <div className={css.form_table}>
            <div>
              月薪:
            </div>
            <Input value={salary.perMonth}
                   type={'number'}
                   unit={'元'}
                   onChange={e => setSalary(s => ({...s, perMonth: Number(e.target.value)}))}/>
            <div>
              月数:
            </div>
            <Input value={salary.month}
                   type={'number'}
                   onChange={e => setSalary(s => ({...s, month: Number(e.target.value)}))}/>
            <div>
              其他所得:
            </div>
            <Input value={salary.other}
                   type={'number'}
                   unit={'元'}
                   onChange={e => setSalary(s => ({...s, other: Number(e.target.value)}))}/>
            <div>
              年终:
            </div>
            <Input value={salary.bonus}
                   type={'number'}
                   unit={'元'}
                   onChange={e => setSalary(s => ({...s, bonus: Number(e.target.value)}))}/>
          </div>
        </div>
        <div>
          <div className={css.h2}>保险</div>
          <div className={css.form_table}>
            {BAO_XIAN.map((e, i) => (
              <Fragment key={e.name}>
                <div>{e.name}:</div>
                <Input value={baoXian[i]}
                       unit={'%'}
                       type={'number'}
                       readOnly={!e.editable}
                       onChange={ev => setBaoXian(v => {
                         const copy = [...v];
                         copy[i] = Number(ev.target.value);
                         console.log(ev.target.value, copy);
                         return copy;
                       })}/>
              </Fragment>
            ))}
          </div>
        </div>
        <div>
          <div className={css.h2}>免税额</div>
          <div className={css.form_table}>
            <div>
              起征点：
            </div>
            <Input unit={'元'} value={TAX_THRESHOLD} readOnly={true}/>
            <div>
              专项扣除：
            </div>
            <Input value={zhuanXiang}
                   type={'number'}
                   unit={'元'}
                   onChange={e => setZhuanXiang(Number(e.target.value))}/>
          </div>
        </div>
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