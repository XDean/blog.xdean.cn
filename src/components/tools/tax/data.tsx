import {TaxLevel} from './types';

export const TAX_THRESHOLD = 5000;

export const TaxMonthLevels: readonly TaxLevel[] = [
  {
    range: [0, 3000],
    rate: 3,
    quick: 0,
  },
  {
    range: [3000, 12000],
    rate: 10,
    quick: 210,
  },
  {
    range: [12000, 25000],
    rate: 20,
    quick: 1410,
  },
  {
    range: [25000, 35000],
    rate: 25,
    quick: 2660,
  },
  {
    range: [35000, 55000],
    rate: 30,
    quick: 4410,
  },
  {
    range: [55000, 80000],
    rate: 35,
    quick: 7160,
  },
  {
    range: [80000, Number.POSITIVE_INFINITY],
    rate: 45,
    quick: 15160,
  },
];

export const SALARY_STATS = {
  min: 2360,
  gdAvg: 8807,
  szAvg: 13730,
} as const;


export const reference = [
  {
    name: '中华人民共和国个人所得税法',
    url: 'http://www.chinatax.gov.cn/chinatax/n363/c21603682/content.html',
  },
  {
    name: '国家税务总局关于调整个人取得全年一次性奖金等计算征收个人所得税方法问题的通知',
    url: 'http://www.chinatax.gov.cn/chinatax/n363/c1306/content.html',
  },
  {
    name: '关于个人所得税法修改后有关优惠政策衔接问题的通知',
    url: 'http://www.chinatax.gov.cn/chinatax/n810341/n810765/n4182981/201901/c4184017/content.html',
  },
  {
    name: '关于公布2022年全省全口径城镇单位就业人员月平均工资和2023年职工基本养老保险缴费基数上下限有关问题的通知',
    url: 'http://hrss.sz.gov.cn/szsi/sbjxxgk/tzgg/simtgg/content/post_10699267.html',
  },
  {
    name: '深圳市住房公积金管理中心关于做好2023年住房公积金缴存基数和缴存比例调整工作的通知',
    url: 'http://zjj.sz.gov.cn/xxgk/tzgg/content/post_10689103.html',
  },
] as const;