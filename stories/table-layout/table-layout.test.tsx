import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import * as React from 'react'
import { TableLayoutHorizontal } from '../../packages/table-layout/src'

Enzyme.configure({ adapter: new Adapter() })

describe('all', () => {
  test('table-layout', () => {
    shallow(<TableLayoutHorizontal />)
  })
})
