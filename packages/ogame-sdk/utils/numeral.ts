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
