export class ParserError extends Error {
  name = 'ParserError'
}

export class InvalidData extends ParserError {
  name = 'InvalidData'
}

export class ValueError extends ParserError {
  name = 'ValueError'
}
