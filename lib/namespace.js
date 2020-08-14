export const _SYMBOL_NAME = `${OGDK_NAMESPACE}/${OGDK_NAME}`
export const _SYMBOL = Symbol.for(_SYMBOL_NAME)

if (typeof window[_SYMBOL] === 'undefined') {
  window[_SYMBOL] = Object.create(null)
}

export default window[_SYMBOL]
