import jQuery, {} from 'jquery'

export class StrictError extends Error {
  constructor (public args: any, message?: string) {
    super(message)
  }
}

/**
 * Strict jquery
 */
export const $$ = new Proxy(jQuery, {
  apply (target, self, args) {
    const el = target.apply(self, args)
    if (el.length === 0) {
      throw new StrictError(args, '$$: empty result')
    }
    return el
  }
})

export function $parseInt (str: string, radix?: number): number {
  const n = parseInt(str, radix)
  if (Number.isNaN(n)) {
    throw new StrictError([str, radix], '$parseInt: NaN')
  }
  return n
}

export function $parseFloat (str: string): number {
  const n = parseFloat(str)
  if (Number.isNaN(n)) {
    throw new StrictError([str], '$parseInt: NaN')
  }
  return n
}
