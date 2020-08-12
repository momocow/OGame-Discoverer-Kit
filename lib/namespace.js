export const _SYMBOL_NAME = `${OGDK_NAMESPACE}/${OGDK_NAME}`
export const _SYMBOL = Symbol.for(_SYMBOL_NAME)

if (typeof this[_SYMBOL] === 'undefined') {
  this[_SYMBOL] = Object.create(null)
}

export default this[_SYMBOL]
