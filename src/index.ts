import TypeConfigs from './TypeConfigs'
import ITypeConfig from './TypeConfigs/ITypeConfig'

export default class Rangerange<T> {
  private readonly minimum?: T
  private readonly maximum?: T
  private readonly typeConfig: ITypeConfig<T>

  constructor(params: { minimum?: T, maximum?: T }) {

    if (!params.minimum && !params.maximum) {
      throw new Error('from or to must be present.')
    }

    this.minimum = params.minimum
    this.maximum = params.maximum

    const existValue = this.minimum || this.maximum

    this.typeConfig = this.getTypeConfig(existValue)
  }

  toArray = () => {
    if (!this.minimum || !this.maximum) {
      throw new Error('from and to must be present.')
    }
    if (!this.typeConfig.succFunc) { throw new Error('typeConfig.succFunc must be exest.') }

    let ary = []
    for (let i = this.minimum; this.typeConfig.compareFunc(i, this.maximum) <= 0; i = this.typeConfig.succFunc(i)) {
      ary.push(i)
    }
    return ary
  }

  private getType = (value?: T) => {
    return typeof value
  }

  private getTypeConfig = (value?: T) => {
    return TypeConfigs.get(this.getType(value))
  }
}
