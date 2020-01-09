export function bimap (obj) {
  const inverse = Object.entries(obj)
    .reduce((o, [k, v]) => Object.assign(o, { [v]: k }), {})
  return new Proxy(obj, {
    get (target, prop) {
      return prop in target ? target[prop] : inverse[prop]
    }
  })
}
