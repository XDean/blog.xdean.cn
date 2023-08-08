import {useSingle} from '../../../../common/util/hook';
import css from './calculator.module.css';
import {Details} from './components/Details';
import {InputView} from './components/InputView';
import {Overview} from './components/Overview';
import {SALARY_STATS} from './data';
import {Tax} from './tax';

export const TaxCalculator = () => {
  const tax = useSingle(() => new Tax());
  return (
    <div className={css.root}>
      <div>
        <div className={css.h1}>个税计算器</div>
        <ul>
          <li>由于社保基数按上月薪资浮动，会与实际情况有偏差</li>
          <li>社保基数上下限采用深圳2023年7月数据，最低工资{SALARY_STATS.min}，全省平均工资{SALARY_STATS.gdAvg}，深圳平均工资{SALARY_STATS.szAvg}</li>
          <li>可支配收入 = 现金收入 + 公积金 (未计算雇主部分)</li>
          <li>“十三薪优惠计税”选项会切换13薪到年终优惠税率部分，方便我司同事</li>
          <li>数据结果仅供参考，如有BUG，欢迎评论指正</li>
        </ul>
      </div>
      <InputView tax={tax}/>
      <Overview tax={tax}/>
      <Details tax={tax}/>
    </div>
  );
};