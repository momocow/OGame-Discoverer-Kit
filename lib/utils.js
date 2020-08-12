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
