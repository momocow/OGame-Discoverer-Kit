export const url = new URL(location.href)
export const page = url.searchParams.get('page')
export const [server, universe, language] = url.hostname.match(/(s\d+)-([a-z]+)/)
export const playerId = $('meta[name=ogame-player-id]').attr('content')
