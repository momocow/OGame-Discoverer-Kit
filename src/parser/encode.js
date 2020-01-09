import { bimap } from './utils'

export const resourceType = bimap({
  UNDEFINED: 0,
  METAL: 1,
  CRYSTAL: 2,
  DEUTERIUM: 3
})

export const reportType = {
  UNDEFINED: 0,
  EXPEDITION: 1
}

export const eventType = {

}

0 = unknown
1 = boring
2 = resource profit
3 = ship profit
4 = item profit
5 = flight accelerated
6 = flight delayed
7 = fleet sacrificed

// export const EVENT_TYPE = {
//   PROFIT: 'p',
//   UNDEFINED: ''
// }

// export const PROFIT_TYPE = {
//   RESOURCES: 'r',
//   FLEETS: 'f'
// }
