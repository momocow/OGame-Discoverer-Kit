import handleMessagePage from './message'
import rootLogger from '@/logger'

const logger = rootLogger.namespace('router')

export default function (page) {
  logger.debug('page "%s"', page)
  switch (page) {
    case 'messages':
      return handleMessagePage
    default:
      return () => logger.debug('no handler found')
  }
}
