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
