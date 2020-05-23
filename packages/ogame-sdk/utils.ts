import _ from 'lodash'

export interface NumeralFormatOptions {
  fragment: number
  decimalPoint: string
  delimiter: string
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

  public format (options?: Partial<NumeralFormatOptions>): string {
    const {
      fragment, decimalPoint, delimiter
    } = Object.assign({}, Numeral.formatOptions, options)
    const [integer, fraction = ''] = super.toString().split('.')
    let tokens: string[] = []
    for (
      let idx = 0, len = (integer.length % fragment) || fragment;
      idx + len <= integer.length;
      idx += len, len = fragment
    ) {
      tokens.push(integer.substr(idx, len))
    }
    return tokens.join(delimiter) + (fraction ? decimalPoint + fraction : '')
  }
  
  public toString (): string {
    return this.format()
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
}