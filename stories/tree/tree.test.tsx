import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import _ from 'lodash'
import * as React from 'react'
import uuid from 'uuid'
import Tree, {
  apendNodesById,
  deleteNodesByIds,
  ITreeProps,
  openNodesByIds,
} from '../../packages/tree/src'
// @ts-ignore
import s from '../../packages/tree/src/components/node/style.scss'

Enzyme.configure({ adapter: new Adapter() })
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
class TreeDemo extends React.Component<any> {
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
    return (
      <div>
        <button onClick={this.openIds}>openIds</button>

        <button onClick={this.apendNodesById}>apendNodesById</button>

        <button onClick={this.deleteNodesByIds}>deleteNodesByIds</button>

        <Tree
          search={''}
          scrollElement={window}
          singleSelect={true}
          toggleSelect={true}
          onSearch={this.onSearch}
          singleCheck={false}
          toggleCheck={true}
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
describe('tree', () => {
  test('render', () => {
    const tree = shallow(<TreeDemo />)

    expect(tree.find('.' + s.row).length).toEqual(3)
  })
  test('open and close', () => {
    const tree = shallow(<TreeDemo />)

    tree
      .find('.' + s.row__open)
      .first()
      .simulate('click')

    expect(tree.find('.' + s.row).length).toEqual(6)

    tree
      .find('.' + s.row__open)
      .at(2)
      .simulate('click')
    expect(tree.find('.' + s.row).length).toEqual(9)

    tree
      .find('.' + s.row__open)
      .first()
      .simulate('click')

    expect(tree.find('.' + s.row).length).toEqual(3)
  })
  test('checked', () => {
    const tree = shallow(<TreeDemo />)

    // 勾选
    tree
      .find('.' + s.row__checkbox)
      .first()
      .simulate('click')

    // 勾选的checkbox，自动添加class .row__checkbox--checked
    expect(
      tree
        .find('.' + s.row__checkbox)
        .hasClass('.' + s['row__checkbox--checked']),
    ).toEqual(true)

    // 展开第一个
    tree
      .find('.' + s.row__open)
      .first()
      .simulate('click')

    // 子节点勾线了3个，父节点一个，一共勾选了4个
    expect(tree.find('.' + s['row__checkbox--checked']).length).toEqual(4)

    // 第一个节点的第一个
    tree
      .find('.' + s.row__open)
      .at(1)
      .simulate('click')

    expect(tree.find('.' + s['row__checkbox--checked']).length).toEqual(7)
  })
})
