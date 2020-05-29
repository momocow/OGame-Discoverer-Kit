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
