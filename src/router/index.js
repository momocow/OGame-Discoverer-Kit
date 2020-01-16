// import handleMessagePage from './message'
import rootLogger from '@/logger'

const logger = rootLogger.namespace('router')

export default function (url) {
  logger.debug('url "%s"', url)

  if (
    // ingame
    url.hostname.endsWith('.ogame.gameforge.com') &&
    url.pathname === '/game/index.php'
  ) {
    switch (url.searchParams.get('page')) {
      // case 'messages':
      //   return handleMessagePage
      default:
        return () => logger.debug('no handler found')
    }
  }
}
