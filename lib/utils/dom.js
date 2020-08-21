import { EasterEgg } from '../errors'
import { range, DefaultMap } from './misc.js'

/**
 * Serial Number Generators
 */
const SNGs = new DefaultMap(() => range(Number.MAX_SAFE_INTEGER))

export function generateElementId (label = 'ogdk-ui-') {
  const sng = SNGs.get(label)
  const { value } = sng.next()
  if (typeof value !== 'number') {
    throw new EasterEgg(`The SNG for "${label}" is exhausted.`)
  }
  return `${label}${value}`
}
