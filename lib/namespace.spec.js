import NSP from './namespace'

test('accessible via global symbol', () => {
  expect(NSP).toBe(window[Symbol.for(`${OGDK_NAMESPACE}/${OGDK_NAME}`)])
})
