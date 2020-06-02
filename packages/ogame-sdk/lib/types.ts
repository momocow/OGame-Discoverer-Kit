import _ from 'lodash'

export interface NumeralFormatOptions {
  fragment: number
  decimalPoint: string
  delimiter: string
}

export interface NumberLike {
  valueOf (): number
}

/**
 * OGame number formatted with fragmentation for readability.
 */
export class Numeral extends Number {
  public static formatOptions: NumeralFormatOptions = {
    fragment: 3,
    decimalPoint: '.',
    delimiter: ','
  }

  public static parse (
    value: string,
    options?: Partial<NumeralFormatOptions>
  ): Numeral {
    const {
      decimalPoint,
      delimiter
    } = Object.assign({}, Numeral.formatOptions, options)
    return new Numeral(value
      .replace(new RegExp(_.escapeRegExp(decimalPoint)), '.')
      .replace(new RegExp(_.escapeRegExp(delimiter), 'g'), '')
    )
  }

  // Math Utilities methods
  // to stick math operators to return Numeral

  public static add (value1: NumberLike, value2: NumberLike): Numeral {
    return new Numeral(value1.valueOf() + value2.valueOf())
  }

  public static subtract (value1: NumberLike, value2: NumberLike): Numeral {
    return new Numeral(value1.valueOf() - value2.valueOf())
  }

  public static multiply (value1: NumberLike, value2: NumberLike): Numeral {
    return new Numeral(value1.valueOf() * value2.valueOf())
  }

  public static divide (value1: NumberLike, value2: NumberLike): Numeral {
    return new Numeral(value1.valueOf() / value2.valueOf())
  }

  public format (options?: Partial<NumeralFormatOptions>): string {
    const {
      fragment, decimalPoint, delimiter
    } = Object.assign({}, Numeral.formatOptions, options)
    const [integer, fraction = ''] = super.toString().split('.')
    const tokens: string[] = []
    let idx: number = 0
    let len: number = integer.length % fragment
    if (len === 0) {
      len = fragment
    }
    for (; idx + len <= integer.length; idx += len, len = fragment) {
      tokens.push(integer.substr(idx, len))
    }
    const formattedInteger = tokens.join(delimiter)
    const formattedFraction = fraction.length > 0 ? decimalPoint + fraction : ''
    return formattedInteger + formattedFraction
  }

  public toString (): string {
    return this.format()
  }

  public add (value: NumberLike): Numeral {
    return Numeral.add(this, value)
  }

  public subtract (value: NumberLike): Numeral {
    return Numeral.subtract(this, value)
  }

  public multiply (value: NumberLike): Numeral {
    return Numeral.multiply(this, value)
  }

  public divide (value: NumberLike): Numeral {
    return Numeral.divide(this, value)
  }
}

export class Coordinate {
  constructor (
    public readonly galaxy: number,
    public readonly system: number,
    public readonly position: number
  ) { }

  public toString (separator: string = ':'): string {
    return [this.galaxy, this.system, this.position].join(separator)
  }

  public static from (str: string, separator: string = ':'): Coordinate {
    const r = new RegExp(`(\\d+)${separator}(\\d+)${separator}(\\d+)`)
    const coordMatched = str.match(r)
    if (coordMatched === null) {
      throw new TypeError('invalid coordinate: ' + str)
    }
    return new Coordinate(
      parseInt(coordMatched[1]),
      parseInt(coordMatched[2]),
      parseInt(coordMatched[3])
    )
  }
}

export class Server {
  constructor (
    public readonly serverId: string,
    public readonly region: string
  ) { }

  public toString (): string {
    return `s${this.serverId}-${this.region}`
  }

  public static from (hostname: string): Server {
    const m = hostname.match(/^s(\d+)-([a-z]+)/)
    if (m === null || m.length < 3) {
      throw new Error('invalid server string')
    }
    return new Server(m[1], m[2])
  }
}
