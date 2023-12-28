import {FC, useState} from 'react';
import {Editor} from './Editor';
import {WebglPoint} from './Point';

type Props = {
  defaultShader: string
}
export const EditablePoint: FC<Props> = (
  {
    defaultShader,
  },
) => {
  const [shader, setShader] = useState(defaultShader);

  return (
    <div className={'relative w-full flex'}>
      <div className={'w-0 flex-grow'}>
        <Editor
          value={shader}
          onChange={e => setShader(e)}
        />
      </div>
      <div className={'aspect-square'}>
        <WebglPoint
          shader={shader}
        />
      </div>
      <button
        className={'btn absolute right-2 top-2 bg-blue-50 opacity-50 hover:opacity-100'}
        onClick={() => setShader(defaultShader)}
      >
        Reset
      </button>
    </div>
  );
};