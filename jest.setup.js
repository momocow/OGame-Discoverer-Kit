import Enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import toBeType from 'jest-tobetype'

expect.extend(toBeType)
Enzyme.configure({ adapter: new Adapter() })
