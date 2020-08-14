import { EasterEgg } from '../errors'
import { goog } from './misc'

const elementIdSet = new Set()

export function generateElementId (categoryOrOptions) {
  let label = 'ogdk'
  let category = ''
  let maxTry = 10
  if (typeof categoryOrOptions === 'object') {
    label = categoryOrOptions.label ?? label
    category = categoryOrOptions.category ?? category
  } else {
    category = categoryOrOptions
  }

  let nodeId
  let tries = 0
  do {
    nodeId = [ label, category, goog.getRandomString() ]
      .filter(Boolean)
      .join('-')
    tries++
  } while (elementIdSet.has(nodeId) && tries < maxTry)

  if (elementIdSet.has(nodeId)) {
    throw new EasterEgg('Failed to generate node ID.')
  }

  elementIdSet.add(nodeId)
  return nodeId
}
