import { ExternalValue } from './utils'

interface Player {
  playerId: number
  name: string
  hasCommander: boolean
  hasAPassword: boolean
}

declare global {
  const serverTime: Date
  const player: Player
}

export const $serverTime: ExternalValue<Date> = new ExternalValue(
  () => serverTime,
  'global.serverTime'
)

export const $player: ExternalValue<Player> = new ExternalValue(
  () => player,
  'global.player'
)
