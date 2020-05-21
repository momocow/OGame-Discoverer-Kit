export class Model {
  protected _data: Record<string, any> = {}

  public toJSON (): Record<string, any> {
    return this._data
  }
}
