import {observer} from 'mobx-react-lite';
import {FC} from 'react';
import css from '../calculator.module.css';
import {Tax} from '../tax';

type Props = {
  tax: Tax
}

export const Overview: FC<Props> = observer((
  {
    tax,
  },
) => {
  return (
    <div className={css.resultContainer}>
      <table className={css.resultTable}>
        <caption className={css.h2}>税收总览</caption>
        <tbody>
        <tr>
          <td>总收入:</td>
          <Yuan value={tax.totalIncome}
                total={tax.totalIncome}/>
        </tr>
        <tr>
          <td>保险:</td>
          <Yuan value={tax.totalBaoXian}
                total={tax.totalIncome}/>
        </tr>
        <tr>
          <td>公积金:</td>
          <Yuan value={tax.totalGjj}
                total={tax.totalIncome}/>
        </tr>
        <tr>
          <td>个税:</td>
          <Yuan value={tax.totalTax}
                total={tax.totalIncome}/>
        </tr>
        <tr>
          <td>现金:</td>
          <Yuan value={tax.finalCash}
                total={tax.totalIncome}/>
        </tr>
        <tr>
          <td>可支配:</td>
          <Yuan value={tax.finalUsable}
                total={tax.totalIncome}/>
        </tr>
        </tbody>
      </table>
    </div>
  );
});

const Yuan = ({value, total}: {value: number, total: number}) => {
  return (
    <>
      <td className={'text-right'}>
        {format(value)} 元
      </td>
      <td className={'text-right'}>
        {(value / total * 100).toFixed(2)}%
      </td>
    </>
  );
};

const format = (v: number) => v.toLocaleString('en', {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});