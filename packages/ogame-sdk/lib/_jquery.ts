import jquery from 'jquery'

export class ExpectError extends Error {
  constructor (subject: string, expect: string, actual: string) {
    super(`JQuery: expect ${subject} to be ${expect}, got ${actual}`)
  }
}


jquery.fn.extend({
  expectOne (this: JQuery) {
    if (this.length !== 1) {
      throw new ExpectError('length', '1', this.length.toString())
    }
    return this
  },

  expectTag (this: JQuery, tag: string) {
    const actualTagName = this.prop('tagName')
    if (actualTagName !== tag) {
      throw new ExpectError('tagName', tag, actualTagName)
    }
    return this
  }
})
