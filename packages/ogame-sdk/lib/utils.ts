export function $parseInt (str: string, radix?: number): number {
  const n = parseInt(str, radix)
  if (Number.isNaN(n)) {
    throw new Error('parseInt: NaN')
  }
  return n
}

export function $parseFloat (str: string): number {
  const n = parseFloat(str)
  if (Number.isNaN(n)) {
    throw new Error('parseFloat: NaN')
  }
  return n
}
