export const url = new URL(location.href)
export const ingame = url.hostname.endsWith('.ogame.gameforge.com') &&
  url.pathname === '/game/index.php'
export const page = ingame ? url.searchParams.get('page') : undefined
export const [server, universe, language] = url.hostname.match(/(s\d+)-([a-z]+)/)
export const playerId = $('meta[name=ogame-player-id]').attr('content')
