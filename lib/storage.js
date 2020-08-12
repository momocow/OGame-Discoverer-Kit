import NSP from './namespace'
import { view } from 'emago'
import { range } from './utils'

export const VERSION = 2

function* _progress ({ initial = 0, step = 1, finished = 100 } = {}) {
  let value
  do {
    const {} = yield
  } while ()
  // let value = initial
  // while (value <= finished) {
  //   if (value > finished) {
  //     value = finished
  //   }
  //   const { message, progress } = (yield value) ?? {}
  // }
}

function* createProgress (...args) {
  const gen = _progress(...args)
  gen.next()
  return gen
}

/**
 * If the patch is named v1, the function patches from v1 to v2.
 * Patches should be generators which yields a Progress object.
 */
const patches = {
  * v1 (progress) {
    yield progress.next('')
  }
}

export function getLocalVersion () {
  return GM_getValue('storage-version', 1)
}

export function shouldUpgrade (localVersion) {
  return localVersion < VERSION
}

export function* upgrade (localVersion) {
  for (const n of range(localVersion, VERSION)) {
    const patch = patches[`v${n}`]
    if (typeof patch === 'function') {
      yield* patch(createProgress())
    }
  }
}

export default function createStore () {

}
