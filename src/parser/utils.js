export const INVERSE = Symbol('inverse')

export function bimap (obj = {}) {
  const inverse = Object.entries(obj)
    .reduce(
      (o, [k, v]) =>
        Object.assign(o, { [v]: k }),
      {}
    )
  return new Proxy(obj, {
    get (target, prop) {
      return prop === INVERSE ? inverse
        : prop in target ? target[prop]
          : inverse[prop]
    },
    set (target, prop, value) {
      target[prop] = value
      inverse[value] = prop
      return true
    },
    has (target, prop) {
      return prop === INVERSE ||
        prop in target ||
        prop in inverse
    },
    deleteProperty (target, prop) {
      if (prop in target) {
        delete inverse[target[prop]]
        delete target[prop]
        return true
      } else if (prop in inverse) {
        delete target[inverse[prop]]
        delete inverse[prop]
        return true
      }
      return false
    }
  })
}
