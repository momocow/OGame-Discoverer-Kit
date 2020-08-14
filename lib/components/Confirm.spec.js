import React from 'react'
import Confirm from './Confirm'
import enzymeToJSON from 'enzyme-to-json'
import { shallow } from 'enzyme'
import { goog } from '../utils/misc'

jest.mock('../utils/misc')

test('<Confirm />', () => {
  const title = 'Confirm Test'
  const message = 'This is a test for Confirm component.'

  let seed = 0
  goog.getRandomString.mockImplementation(() => String(seed++))

  const closedConfirm = shallow(
    <Confirm open={false} title={title} message={message} />
  )
  expect(enzymeToJSON(closedConfirm)).toMatchSnapshot()

  const openedConfirm = shallow(
    <Confirm open={true} title={title} message={message} />
  )
  expect(enzymeToJSON(openedConfirm)).toMatchSnapshot()

  goog.getRandomString.mockRestore()
})
