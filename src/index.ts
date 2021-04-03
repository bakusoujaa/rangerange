import TypeConfigs from './TypeConfigs'
import ITypeConfig from './TypeConfigs/IRegisterTypeConfig'

export default class Rangerange<T> {
  private readonly minimum?: T
  private readonly maximum?: T
  private readonly typeConfig: ITypeConfig<T>

  constructor(params: { minimum?: T, maximum?: T }) {
    if (params.minimum && params.maximum) {
      const minConf = this.getTypeConfig(params.minimum)
      const maxConf = this.getTypeConfig(params.maximum)
      if (minConf !== maxConf) { throw new Error('minimum type and maximum type are not much.') }
      this.typeConfig = minConf
    } else if (params.minimum) {
      const minConf = this.getTypeConfig(params.minimum)
      this.typeConfig = minConf
    } else if (params.maximum) {
      const maxConf = this.getTypeConfig(params.maximum)
      this.typeConfig = maxConf
    } else {
      throw new Error('from or to must be present.')
    }

    this.minimum = params.minimum
    this.maximum = params.maximum
  }

  toArray = () => {
    if (!this.minimum || !this.maximum) {
      throw new Error('minimum and maximum must be present.')
    }
    if (!this.typeConfig.stepBy) { throw new Error('typeConfig.succFunc must be exest.') }

    let ary = []
    for (let i = this.minimum; this.typeConfig.compareFunc(i, this.maximum) <= 0; i = this.typeConfig.stepBy(i, 1)) {
      ary.push(i)
    }
    return ary
  }

  private getTypeConfig = (value?: T) => {
    return TypeConfigs.get(value)
  }
}
