export class ParserError extends Error {
  constructor (...args) {
    super(...args)
    this.name = 'ParserError'
  }
}

export class ValueError extends ParserError {
  constructor (...args) {
    super(...args)
    this.name = 'ValueError'
  }
}
