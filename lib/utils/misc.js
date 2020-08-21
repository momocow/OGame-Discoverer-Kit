export function* range (arg1, arg2, arg3) {
  let start, end, options
  if (typeof arg2 === 'number') {
    start = arg1
    end = arg2
    options = arg3
  } else {
    start = 0
    end = arg1
    options = arg2
  }
  const { step } = Object.assign({ step: 1 }, options)
  let i = start
  for (; i < end; i += step) { yield i }
  return i
}

function* _progressGen ({ start = 0 , finish = 100 } = {}) {
  let progress = start
  let progObj
  while (progress < finish) {
    const { step, value, message = '', ...props } = (yield progObj) ?? {}
    if (typeof value !== 'undefined') { progress = value }
    if (typeof step !== 'undefined') { progress += step }
    progress = Math.max(Math.min(progress, finish), start)
    progObj = Object.assign({}, props, { progress, message })
  }
  return progObj
}

export function createProgress (...args) {
  const gen = _progressGen(...args)
  gen.next() // consume the first yield
  return gen
}

export class DefaultMap extends Map {
  constructor (factory, ...args) {
    super(...args)
    this.factory = factory
  }

  get (key) {
    if (!super.has(key)) {
      super.set(key, this.factory())
    }
    return super.get(key)
  }
}
