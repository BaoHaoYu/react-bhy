import Enzyme, { mount, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import * as React from 'react'
import Scrollbar from '../../packages/scrollbar/src'

Enzyme.configure({ adapter: new Adapter() })

describe('scrollbar', () => {
  test('render', () => {
    const didMount = () => {
      console.log('didMount')
    }
    const scrollBar = mount(
      <div>
        <Scrollbar didMount={didMount}>
          <div className={'ddd'} />
        </Scrollbar>
      </div>,
    )

    console.log('after')

    expect(scrollBar.find('.ddd').exists()).toEqual(true)
  })
})
