/**
 * @jest-environment node
 */
// @See https://github.com/facebook/jest/issues/10087
// import { describe, expect, it } from '@jest/globals'
import { Numeral, ExternalValue } from './utils'
import { ExternalValueError } from './utils/errors'

describe('Numeral', () => {
  it('is an instance of Number', () => {
    const n = new Numeral(1)
    expect(n).toBeInstanceOf(Number)
  })

  it('can be parsed from string', () => {
    const n1 = Numeral.parse('1,234,567.999')
    expect(n1.valueOf()).toBeCloseTo(1234567.999, 3)

    const n2 = Numeral.parse('1-23-45-67@999', {
      decimalPoint: '@',
      delimiter: '-',
      fragment: 2
    })
    expect(n2.valueOf()).toBeCloseTo(1234567.999, 3)
  })

  it('can be formatted as string', () => {
    const n = Numeral.parse('1,234,567.999')

    const s1 = n.format()
    expect(s1).toBe('1,234,567.999')

    const s2 = n.toString()
    expect(s2).toBe(s1) // toString() calls format() internally

    const s3 = n.format({
      decimalPoint: '@',
      delimiter: '-',
      fragment: 2
    })
    expect(s3).toBe('1-23-45-67@999')
  })

  it('supports math operations between NumberLike\'s', () => {
    const n = new Numeral(2)

    expect(n.add(1).valueOf()).toEqual(3)
    expect(Numeral.add(n, 1).valueOf()).toEqual(3)

    expect(n.subtract(2).valueOf()).toEqual(0)
    expect(Numeral.subtract(n, 2).valueOf()).toEqual(0)

    const multiplier = new Numeral(3)
    expect(n.multiply(multiplier).valueOf()).toEqual(6)
    expect(Numeral.multiply(n, multiplier).valueOf()).toEqual(6)

    const divider = { valueOf: () => -4 }
    expect(n.divide(divider).valueOf()).toEqual(-0.5)
    expect(Numeral.divide(n, divider).valueOf()).toEqual(-0.5)
  })
})

describe('ExternalValue', () => {
  it('defaults to the name of its getter', () => {
    const ev = new ExternalValue(function test1 () { return 1 })
    expect(ev.name).toBe('test1')
  })

  it('can specify a name', () => {
    const ev = new ExternalValue(function test1 () { return 1 }, 'test2')
    expect(ev.name).toBe('test2')
  })

  it('can cache and get a value', () => {
    let count = 1
    const ev = new ExternalValue(function test1 () { return count++ })
    expect(ev.get()).toBe(1)
    expect(ev.get(undefined, false)).toBe(2)
  })

  it('can get with default value on errors', () => {
    class MyError extends Error {}
    const ev = new ExternalValue<number>(function test1 () {
      throw new MyError('my error')
    })

    expect(() => ev.get()).toThrow(ExternalValueError)
    // ExternalValueError has the same message as MyError
    expect(() => ev.get()).toThrow('my error')
    expect(ev.get(1)).toBe(1)
  })
})
