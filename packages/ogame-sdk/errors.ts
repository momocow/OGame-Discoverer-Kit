
/**
 * Used when required data cannot be retrieved from
 * the external environemnt of the script.
 */
export class ExternalValueError extends Error {
  public name: string = 'ExternalValueError'

  constructor (public valueName: string, msg: string = '') {
    super(`${msg} (${valueName})`)
  }
}
