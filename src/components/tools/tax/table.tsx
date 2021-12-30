import {TaxMonthLevels} from './data';

type Props = {
  month: boolean
}

export const TaxTable = (props: Props) => {
  const {month} = props;
  const times = month ? 1 : 12;
  return (
    <table>
      <thead>
      <tr>
        <th>级数</th>
        <th>{month ? '月' : '年'}应税所得额</th>
        <th>税率 (%)</th>
        <th>速算扣除数</th>
      </tr>
      </thead>
      <tbody>
      {TaxMonthLevels.map((e, i) => (
        <tr key={i}>
          <td>{i + 1}</td>
          <td>{e.range[0] === 0
            ? `不超过${e.range[1] * times}元的`
            : e.range[1] === 0
              ? `超过${e.range[0] * times}元的`
              : `超过${e.range[0] * times}元至${e.range[1] * times}元的`}</td>
          <td>{e.rate}</td>
          <td>{e.quick * times}</td>
        </tr>
      ))}
      </tbody>
    </table>
  );
};