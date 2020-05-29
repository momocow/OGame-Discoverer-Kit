export class Coordinate {
  constructor (
    public readonly galaxy: number,
    public readonly system: number,
    public readonly position: number
  ) { }

  public static from (str: string, delimiter: string = ':'): Coordinate {
    const r = new RegExp(`(\\d+)${delimiter}(\\d+)${delimiter}(\\d+)`)
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

export enum Location {
  planet = 1,
  moon = 2,
  debris = 3
}

export interface Locatable {
  coordinate: Coordinate
  location: string
}

export class Debris implements Locatable {
  public readonly location: string = 'debris'

  constructor (
    public readonly coordinate: Coordinate
  ) { }
}

export abstract class AstronomicalObject implements Locatable {
  public abstract location: string

  constructor (
    public id: string,
    public name: string,
    public coordinate: Coordinate
  ) {

  }
}

export class Planet extends AstronomicalObject {
  public readonly location: string = 'planet'
}

export class Moon extends AstronomicalObject {
  public readonly location: string = 'moon'
}
