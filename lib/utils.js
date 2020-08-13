import { view } from 'emago'

export const url = view.getUrl()

export const universeSlug = view.getMeta('ogame-universe')
export const playerId = view.getPlayerId()

export function* range (start, end) {
  if (typeof end === 'undefined') {
    end = start
    start = 0
  }
  for (let i = start; i < end; i++) {
    yield i
  }
}

export function isIngamePage (name) {
  return url.searchParams.get('page') === name
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


export const goog = {
  /**
   * Returns a string with at least 64-bits of randomness.
   *
   * Doesn't trust Javascript's random function entirely. Uses a combination of
   * random and current timestamp, and then encodes the string in base-36 to
   * make it shorter.
   *
   * @return {string} A random string, e.g. sn1s7vb4gcic.
   * 
   * @see {@link https://github.com/google/closure-library/blob/555e0138c83ed54d25a3e1cd82a7e789e88335a7/closure/goog/string/string.js#L1177}
   */
  getRandomString () {
    const x = 2147483648
    return Math.floor(Math.random() * x).toString(36) +
          Math.abs(Math.floor(Math.random() * x) ^ Date.now()).toString(36);
  }
}

