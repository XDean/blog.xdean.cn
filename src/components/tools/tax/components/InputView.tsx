import {action} from 'mobx';
import {observer} from 'mobx-react-lite';
import {FC} from 'react';
import {SchemaInput, SchemaInputProps} from '../../../../../common/components/input/SchemaInput';
import {zex} from '../../../../../common/util/zod';
import css from '../calculator.module.css';
import {TAX_THRESHOLD} from '../data';
import {Tax} from '../tax';

type Props = {
  tax: Tax
}

export const InputView: FC<Props> = observer((
  {
    tax,
  },
) => {
  return (

    <div className={css.inputContainer}>
      <div>
        <div className={css.h2}>收入</div>
        <div className={css.form_table}>
          <div>
            月薪:
          </div>
          <NonNegNumberInput value={tax.monthSalary}
                             unit={'元'}
                             onChange={e => tax.monthSalary = e}/>
          <div>
            月数:
          </div>
          <NonNegNumberInput value={tax.month}
                             onChange={e => tax.month = e}/>
          <div>
            十三薪:
          </div>
          <div>
            <input checked={tax.month13 > 0}
                   type={'checkbox'}
                   className={'w-4 h-4 !m-1'}
                   onChange={(e) => tax.month13 = e.currentTarget.checked ? 1 : 0}
            />
          </div>
          <div>
            年终奖:
          </div>
          <NonNegNumberInput value={tax.bonus}
                             unit={'元'}
                             onChange={e => tax.bonus = e}/>
          <div/>
          <NonNegNumberInput value={tax.bonusMonth}
                             unit={'月'}
                             onChange={e => tax.bonusMonth = e}/>
        </div>
      </div>
      <div>
        <div className={css.h2}>保险</div>
        <div className={css.form_table}>
          <div>
            医疗保险
          </div>
          <NonNegNumberInput value={tax.baoxian.yiliaoRate}
                             onChange={e => tax.baoxian.yiliaoRate = e}
                             unit={'%'}
                             readOnly
          />
          <div>
            养老保险
          </div>
          <NonNegNumberInput value={tax.baoxian.yanglaoRate}
                             onChange={e => tax.baoxian.yanglaoRate = e}
                             unit={'%'}
                             readOnly
          />
          <div>
            失业保险
          </div>
          <NonNegNumberInput value={tax.baoxian.shiyeRate}
                             onChange={e => tax.baoxian.shiyeRate = e}
                             unit={'%'}
                             readOnly
          />
          <div>
            公积金
          </div>
          <NonNegNumberInput value={tax.baoxian.gjjRate}
                             onChange={e => tax.baoxian.gjjRate = e}
                             unit={'%'}
          />
        </div>
      </div>
      <div>
        <div className={css.h2}>税收</div>
        <div className={css.form_table}>
          <div>
            起征点:
          </div>
          <NonNegNumberInput unit={'元'}
                             value={TAX_THRESHOLD}
                             onChange={() => undefined}
                             readOnly/>
          <div>专项扣除:</div>
          <NonNegNumberInput value={tax.monthZhuanXiang}
                             unit={'元'}
                             onChange={e => tax.monthZhuanXiang = e}/>
          <div>年终奖优惠计税:</div>
          <input type={'checkbox'}
                 checked={tax.useBonusTax}
                 className={'w-4 h-4 !m-1'}
                 onChange={e => tax.useBonusTax = e.currentTarget.checked}
          />
          <div>十三薪优惠计税:</div>
          <input type={'checkbox'}
                 checked={tax.useBonusTax13}
                 className={'w-4 h-4 !m-1'}
                 disabled={!tax.month13}
                 onChange={e => tax.useBonusTax13 = e.currentTarget.checked}
          />
        </div>
      </div>
    </div>
  );
});


const nonNeg = zex.str.number.refine(e => e >= 0);

const NonNegNumberInput: FC<{unit?: string} & Omit<SchemaInputProps<number>, 'schema'>> = (
  {
    unit = '',
    onChange,
    ...rest
  },
) => {
  return (
    <div className={'inline-flex items-center space-x-1'}>
      <SchemaInput<number>
        onChange={action(onChange)}
        type={'number'}
        schema={nonNeg}
        {...rest}
      />
      <div>{unit}</div>
    </div>
  );
};