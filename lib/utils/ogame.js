import { view } from 'emago'

export const url = view.getUrl()
export const universeSlug = view.getMeta('ogame-universe')
export const playerId = view.getPlayerId()

export function isIngamePage (name) {
  return url.searchParams.get('page') === name
}
