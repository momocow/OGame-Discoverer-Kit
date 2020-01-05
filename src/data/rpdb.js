import { request } from '@/utils/gm'
import { ValueError } from '@/parser/errors'
// import rootLogger from '@/logger'

// const logger = rootLogger.namespace('rpdb')

const API_URL = 'https://api.inazuma.love/og/rpdb'

export const LOCAL_DB = []

export async function sync () {
  const url = new URL('sync', API_URL)
  const data = new URLSearchParams()
  data.append('local', LOCAL_DB.map(r => r.id).join())
  const { response } = await request({
    method: 'POST',
    url: url.toString(),
    data: data.toString(),
    responseType: 'json'
  })

  if (typeof response !== 'object') {
    throw new TypeError('invalid response')
  }

  response.
}
