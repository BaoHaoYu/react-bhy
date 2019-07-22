import Enzyme, { mount, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import _ from 'lodash'
import * as React from 'react'
// @ts-ignore
import s from '../../packages/tree/src/components/node/style.scss'
import { TreeDemo } from './tree-demo'

Enzyme.configure({ adapter: new Adapter() })

describe('tree', () => {
  test('render', () => {
    const didMount = () => {
      console.log('didMount')
    }
    const tree = mount(<TreeDemo didMount={didMount} />)

    console.log(tree.html())
  })
  // test('open and close', () => {
  //   const didMount = () => {
  //     tree
  //       .find('.' + s.row__open)
  //       .first()
  //       .simulate('click')

  //     expect(tree.find('.' + s.row).length).toEqual(6)

  //     tree
  //       .find('.' + s.row__open)
  //       .at(2)
  //       .simulate('click')
  //     expect(tree.find('.' + s.row).length).toEqual(9)

  //     tree
  //       .find('.' + s.row__open)
  //       .first()
  //       .simulate('click')

  //     expect(tree.find('.' + s.row).length).toEqual(3)
  //   }
  //   const tree = shallow(
  //     <html>
  //       <body>
  //         <TreeDemo didMount={didMount} />
  //       </body>
  //     </html>,
  //   )
  // })
  // test('checked', () => {
  //   const didMount = () => {
  //     // 勾选根部第一个节点
  //     tree
  //       .find('.' + s.row__checkbox)
  //       .first()
  //       .simulate('click')

  //     // 勾选的checkbox，自动添加class .row__checkbox--checked
  //     expect(
  //       tree
  //         .find('.' + s.row__checkbox)
  //         .hasClass('.' + s['row__checkbox--checked']),
  //     ).toEqual(true)

  //     // 展开第一个
  //     tree
  //       .find('.' + s.row__open)
  //       .first()
  //       .simulate('click')

  //     // 子节点勾线了3个，父节点一个，一共勾选了4个
  //     expect(tree.find('.' + s['row__checkbox--checked']).length).toEqual(4)

  //     // 第一个节点的第一个
  //     tree
  //       .find('.' + s.row__open)
  //       .at(1)
  //       .simulate('click')

  //     expect(tree.find('.' + s['row__checkbox--checked']).length).toEqual(7)
  //   }
  //   const tree = shallow(
  //     <html>
  //       <body>
  //         <TreeDemo didMount={didMount} />
  //       </body>
  //     </html>,
  //   )
  // })
})
