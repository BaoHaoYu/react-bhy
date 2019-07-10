import { number, text, withKnobs } from '@storybook/addon-knobs'
import { storiesOf } from '@storybook/react'
import { range } from 'lodash-es'
import * as React from 'react'
import MyScrollbars, { IScrollbarsProps } from '../../packages/scrollbar/src'
import VirtualizedList, {
  IVirtualizedListProps,
} from '../../packages/virtualized-list/src'

class Base extends React.Component<any> {
  public render() {
    const rowHeight = number('rowHeight', 40, {
      range: true,
      min: 30,
      max: 100,
      step: 1,
    })
    const rowCount = number('rowCount', 40, {
      range: true,
      min: 30,
      max: 10000,
      step: 100,
    })

    const data = range(0, rowCount).map((value) => {
      return {
        value,

        id: `${value}`,
      }
    })
    const rowRenderer: IVirtualizedListProps['simpleRowRenderer'] = (item) => {
      return <div>{item.value}</div>
    }

    return (
      <div style={{ width: 300, margin: 50, background: '#ffe464' }}>
        <VirtualizedList
          listData={data}
          scrollToId={text('scrollToId', '')}
          changeScrollToId={text('changeScrollToId', '')}
          style={{ height: 300 }}
          rowHeight={rowHeight}
          rowCount={data.length}
          simpleRowRenderer={rowRenderer}
        />
      </div>
    )
  }
}

storiesOf('virtualizedList 动态列表', module)
  .addDecorator(withKnobs)
  .add('基本', () => {
    return <Base />
  })
  .add('使用window作为滚动容器', () => {
    const rowHeight = 40
    const rowCount = 10000

    const data = range(0, rowCount).map((value) => {
      return {
        value,
        id: `${value}`,
      }
    })
    const rowRenderer: IVirtualizedListProps['rowRenderer'] = (props) => {
      return (
        <div key={props.key} style={props.style}>
          {data[props.index].value}
        </div>
      )
    }

    return (
      <VirtualizedList
        listData={data}
        scrollToId={text('scrollToId', '')}
        scrollElement={window}
        rowHeight={rowHeight}
        rowCount={data.length}
        rowRenderer={rowRenderer}
      />
    )
  })
  .add('动态高度', () => {
    const rowHeight = 40
    const rowCount = 10000

    const data = range(0, rowCount).map((value) => {
      return {
        value,
        id: `${value}`,
        rowHeight: value > 10 ? 80 : undefined,
      }
    })
    const rowRenderer: IVirtualizedListProps['rowRenderer'] = (props) => {
      return (
        <div key={props.key} style={props.style}>
          {data[props.index].value}
        </div>
      )
    }

    return (
      <VirtualizedList
        listData={data}
        scrollToId={text('scrollToId', '')}
        scrollElement={window}
        rowHeight={rowHeight}
        rowCount={data.length}
        rowRenderer={rowRenderer}
      />
    )
  })
  .add('自定义滚动容器', () => {
    const rowHeight = 40
    const rowCount = 10000

    const data = range(0, rowCount).map((value) => {
      return {
        value,
        id: `${value}`,
        rowHeight: value > 10 ? 80 : undefined,
      }
    })
    const rowRenderer: IVirtualizedListProps['rowRenderer'] = (props) => {
      return (
        <div key={props.key} style={props.style}>
          {data[props.index].value}
        </div>
      )
    }

    const children: IScrollbarsProps['children'] = (p) => {
      return (
        <VirtualizedList
          listData={data}
          scrollToId={text('scrollToId', '')}
          scrollElement={p.scrollElement}
          rowHeight={rowHeight}
          rowCount={data.length}
          rowRenderer={rowRenderer}
        />
      )
    }

    return (
      <div style={{ width: 200 }}>
        <MyScrollbars style={{ height: 300 }} children={children} />
      </div>
    )
  })
