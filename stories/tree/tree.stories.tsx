import {
  boolean,
  number,
  radios,
  text,
  withKnobs,
} from '@storybook/addon-knobs'
import { storiesOf } from '@storybook/react'
import { cloneDeep, range } from 'lodash-es'
import * as React from 'react'
import uuid from 'uuid'
import Tree, {
  apendNodesById,
  deleteNodesByIds,
  ITreeProps,
  openNodesByIds,
  openSeletedNodes,
} from '../../packages/tree/src'

const data: ITreeProps['treeData'] = range(1, 9).map((a) => {
  return {
    title: `${a}`,
    id: `${a}`,
    children: range(1, 30).map((b) => {
      return {
        title: `${a}-${b}`,
        id: `${a}-${b}`,
        children: range(1, 30).map((c) => {
          return {
            title: `${a}-${b}-${c}`,
            id: `${a}-${b}-${c}`,
          }
        }),
      }
    }),
  }
})

class TreeDemo extends React.Component<any> {
  public state = {
    treeData: cloneDeep(data),
  }

  public onSelect: ITreeProps['onSelect'] = (p) => {
    this.setState(this.state)
  }

  public onCheck: ITreeProps['onCheck'] = (p) => {
    this.setState(this.state)
  }

  public onOpen: ITreeProps['onOpen'] = (p) => {
    this.setState({ treeData: p.treeData })
  }

  public onSearch: ITreeProps['onSearch'] = (p) => {
    this.setState({ treeData: p.treeData })
  }

  public onInit: ITreeProps['onInit'] = (treeData) => {
    this.setState({ treeData })
  }

  public openIds = () => {
    this.setState({ treeData: openNodesByIds(this.state.treeData, ['1-1']) })
  }

  public apendNodesById = () => {
    this.setState({
      treeData: apendNodesById(
        this.state.treeData,
        [{ title: 'ddd', id: uuid() }],
        '1',
      ),
    })
  }

  public deleteNodesByIds = () => {
    this.setState({
      treeData: deleteNodesByIds(this.state.treeData, ['1', '2']),
    })
  }

  public render() {
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
      <div>
        <button onClick={this.openIds}>openIds</button>

        <button onClick={this.apendNodesById}>apendNodesById</button>

        <button onClick={this.deleteNodesByIds}>deleteNodesByIds</button>

        <Tree
          search={text('search', '')}
          scrollElement={window}
          selectStyle={selectStyle}
          rowHeight={rowHeight}
          selectable={selectable}
          singleSelect={selectable ? boolean('singleSelect', false) : false}
          toggleSelect={selectable ? boolean('toggleSelect', false) : false}
          onSearch={this.onSearch}
          checkable={checkable}
          singleCheck={checkable ? boolean('singleCheck', false) : false}
          toggleCheck={checkable ? boolean('toggleCheck', false) : false}
          onInit={this.onInit}
          treeData={this.state.treeData}
          onSelect={this.onSelect}
          onCheck={this.onCheck}
          onOpen={this.onOpen}
        />
      </div>
    )
  }
}

storiesOf('tree:树形控件', module)
  .addDecorator(withKnobs)
  .add('基本', () => {
    return <TreeDemo />
  })
  .add('自动打开父节点', () => {
    let treeData = cloneDeep(data)
    treeData[0].children![0].children![0].selected = true
    treeData = openSeletedNodes(treeData)
    return <Tree scrollElement={window} treeData={treeData} />
  })
