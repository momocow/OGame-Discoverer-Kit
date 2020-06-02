declare module 'jquery-assert' {}

interface JQuery {
  assert (expected: number | ((actual: number) => boolean)): this
  assertOne (): this
  assertAtLeast (minimum: number): this
  assertMany (): this
}
