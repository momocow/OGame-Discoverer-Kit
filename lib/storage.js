// import NSP from './namespace'
// import { view } from 'emago'
import { createProgress, range } from './utils'

export const VERSION = 2

class BeforeUnload extends Error { name = 'BeforeUnload' }

const validators = {

}

/**
 * If the patch is named v1, the function patches from v1 to v2.
 * Patches should be generators which yields a Progress object.
 */
const patches = {
  * v1 (progress) {
  }
}

export const Local = {
  getVersion () {
    return GM_getValue('storage-version', 1)
  },

  isStale () {
    return this.getVersion() < VERSION
  },

  /**
   * Do not GM_setValue() or GM_deleteValue() before migration finishes
   */
  * migrate () {
    for (const n of range(this.getVersion(), VERSION)) {
      const patch = patches[`v${n}`]
      if (typeof patch === 'function') {
        const patchGen = patch(createProgress())
        const onBeforeUnload = () => { patchGen.throw(new BeforeUnload()) }
        window.addEventListener('beforeunload', onBeforeUnload)
        yield* patchGen
        window.removeEventListener('beforeunload', onBeforeUnload)
      }
    }
  }
}
