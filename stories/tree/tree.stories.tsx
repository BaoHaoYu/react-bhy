import { boolean, number, radios, withKnobs } from '@storybook/addon-knobs'
import { storiesOf } from '@storybook/react'
import * as React from 'react'
import { ITreeProps } from '../../packages/tree/src'
import { TreeDemo } from './tree-demo'

storiesOf('tree:树形控件', module)
  .addDecorator(withKnobs)
  .add('基本', () => {
    const rowHeight = number('rowHeight', 30, {
      range: true,
      max: 200,
      min: 20,
      step: 1,
    })

    const selectStyle = radios(
      'selectStyle',
      {
        row: 'row',
        title: 'title',
        content: 'content',
      },
      'row',
    ) as ITreeProps['selectStyle']

    const selectable = boolean('selectable', false)
    const checkable = boolean('checkable', true)
    return (
      <TreeDemo
        selectable={selectable}
        checkable={checkable}
        selectStyle={selectStyle}
        rowHeight={rowHeight}
      />
    )
  })
// .add('自动打开父节点', () => {
//   let treeData = cloneDeep(data)
//   treeData[0].children![0].children![0].selected = true
//   treeData = openSeletedNodes(treeData)
//   return <Tree scrollElement={window} treeData={treeData} />
// })
