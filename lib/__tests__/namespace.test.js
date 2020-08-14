import NSP from '../namespace'

test('accessible via global symbol', () => {
  expect(window[Symbol.for(`${OGDK_NAMESPACE}/${OGDK_NAME}`)])
    .toBe(NSP)
})
