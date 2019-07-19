import { boolean, number, withKnobs } from '@storybook/addon-knobs'
import { storiesOf } from '@storybook/react'
import * as React from 'react'
import {
  ColTd,
  RowTd,
  TableLayoutHorizontal,
  TableLayoutVertical,
} from '../../packages/table-layout/src'

storiesOf('table-layout', module)
  .addDecorator(withKnobs)
  .add('卡片布局', () => {
    const height = number('height', 300)
    return (
      <div>
        <TableLayoutVertical style={{ height, width: 500 }}>
          <RowTd
            style={{
              height: 50,
              verticalAlign: 'middle',
              backgroundColor: 'rgb(255, 188, 88)',
            }}
          >
            <div>卡片标题：固定高度</div>
          </RowTd>

          <RowTd>
            <div style={{ height: '100%', backgroundColor: '#58e0ff' }}>
              卡片内容：不定高度
            </div>
          </RowTd>
        </TableLayoutVertical>
      </div>
    )
  })
  .add('菜单布局', () => {
    const space = number('space', 10)
    const hidden = boolean('hidden：隐藏菜单', false)
    return (
      <div>
        <TableLayoutHorizontal space={space}>
          <ColTd
            hidden={hidden}
            width={100}
            style={{ backgroundColor: 'rgb(255, 188, 88)' }}
          >
            <div>
              <h2>菜单</h2>
              <button>>菜单1</button>
            </div>
            <div>
              <button>>菜单2</button>
            </div>
            <div>
              <button>>菜单3</button>
            </div>
            <div>
              <button>>菜单4</button>
            </div>
          </ColTd>

          <ColTd>
            <div style={{ backgroundColor: '#58e0ff' }}>内容</div>
          </ColTd>
        </TableLayoutHorizontal>
      </div>
    )
  })
