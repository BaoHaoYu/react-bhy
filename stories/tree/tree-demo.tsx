import {
  boolean,
  number,
  radios,
  text,
  withKnobs,
} from '@storybook/addon-knobs'
import _ from 'lodash'
import * as React from 'react'
import uuid from 'uuid'
import Scrollbars, { IScrollbarsProps } from '../../packages/scrollbar/src'
import Tree, {
  apendNodesById,
  deleteNodesByIds,
  ITreeProps,
  openNodesByIds,
} from '../../packages/tree/src'
const data: ITreeProps['treeData'] = _.range(0, 3).map((a) => {
  return {
    className: `${a}`,
    title: `${a}`,
    id: `${a}`,
    children: _.range(0, 3).map((b) => {
      return {
        className: `${a}-${b}`,
        title: `${a}-${b}`,
        id: `${a}-${b}`,
        children: _.range(0, 3).map((c) => {
          return {
            className: `${a}-${b}-${c}`,
            title: `${a}-${b}-${c}`,
            id: `${a}-${b}-${c}`,
          }
        }),
      }
    }),
  }
})

export class TreeDemo extends React.Component<
  Partial<ITreeProps & IScrollbarsProps>
> {
  public state = {
    treeData: _.cloneDeep(data),
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
        <button className={'btn__openIds'} onClick={this.openIds}>
          openIds
        </button>

        <button className={'btn__apendNodesById'} onClick={this.apendNodesById}>
          apendNodesById
        </button>

        <button
          className={'btn__deleteNodesByIds'}
          onClick={this.deleteNodesByIds}
        >
          deleteNodesByIds
        </button>

        <Scrollbars didMount={this.props.didMount} style={{ height: 500 }}>
          {(scrollElement) => {
            return (
              <Tree
                search={text('search', '')}
                scrollElement={scrollElement}
                selectStyle={selectStyle}
                rowHeight={rowHeight}
                selectable={selectable}
                singleSelect={
                  selectable ? boolean('singleSelect', false) : false
                }
                toggleSelect={
                  selectable ? boolean('toggleSelect', false) : false
                }
                onSearch={this.onSearch}
                checkable={checkable}
                singleCheck={checkable ? boolean('singleCheck', false) : false}
                toggleCheck={checkable ? boolean('toggleCheck', true) : false}
                onInit={this.onInit}
                treeData={this.state.treeData}
                onSelect={this.onSelect}
                onCheck={this.onCheck}
                onOpen={this.onOpen}
              />
            )
          }}
        </Scrollbars>
      </div>
    )
  }
}
