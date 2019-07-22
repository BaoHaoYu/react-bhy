import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import * as React from 'react'
import Scrollbar from '../../packages/scrollbar/src'

Enzyme.configure({ adapter: new Adapter() })

describe('scrollbar', () => {
  test('render', () => {
    const scrollBar = shallow(
      <html>
        <body>
          <Scrollbar />
        </body>
      </html>,
    )

    expect(scrollBar.find('body').children().length).toEqual(1)
  })
})
