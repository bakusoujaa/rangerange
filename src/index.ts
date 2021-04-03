import TypeConfigs from './TypeConfigs'
import ITypeConfig from './TypeConfigs/IRegisterTypeConfig'

export default class Rangerange<T> {
  public readonly minimum?: T
  public readonly maximum?: T
  private readonly typeConfig: ITypeConfig<T>

  constructor(params: { minimum?: T, maximum?: T }) {
    this.typeConfig = this.getTypeConfigByMinOrMax(params)

    this.minimum = params.minimum
    this.maximum = params.maximum
  }

  toArray = () => {
    if (!this.isPresent(this.minimum) || !this.isPresent(this.maximum)) {
      throw new Error('minimum and maximum must be present.')
    }
    if (!this.typeConfig.stepBy) { throw new Error('typeConfig.succFunc must be exest.') }

    let ary = []
    for (let i = this.minimum as T; this.typeConfig.compareFunc(i, this.maximum as T) <= 0; i = this.typeConfig.stepBy(i, 1)) {
      ary.push(i)
    }
    return ary
  }

  isCover = (other: T | Rangerange<T>) => {
    if (!this.isPresent(other)) { throw new Error('other must be present.') }

    const _other = (other instanceof Rangerange) ? other :
      new Rangerange({ minimum: other, maximum: other })

    if (!this.isTypeEquals(_other)) { throw new Error('other type is missmatch.') }

    if (this.isPresent(this.minimum) && this.isPresent(this.maximum)) {
      const coverMin = this.isCoverMin(_other)
      const coverMax = this.isCoverMax(_other)
      return coverMin && coverMax
    } else if (this.isPresent(this.minimum)) {
      const coverMin = this.isCoverMin(_other)
      return coverMin
    } else if (this.isPresent(this.maximum)) {
      const coverMax = this.isCoverMax(_other)
      return coverMax
    } else {
      throw new Error('other value is invalid.')
    }
  }

  private isCoverMin = (other: Rangerange<T>) => {
    if (!this.isPresent(this.minimum)) { throw new Error('this method can call only minimum exist.') }

    if (!this.isPresent(other.minimum)) { return false }

    const compareResult = this.typeConfig.compareFunc(this.minimum as T, other.minimum as T)

    if (compareResult === 1) {
      // this.minimum > _other.minimum
      return false
    } else {
      // this.minimum <= _other.minimum
      return true
    }
  }

  private isCoverMax = (other: Rangerange<T>) => {
    if (!this.isPresent(this.maximum)) { throw new Error('this method can call only maximum exist.') }

    if (!this.isPresent(other.maximum)) { return false }

    const compareResult = this.typeConfig.compareFunc(this.maximum as T, other.maximum as T)

    if (compareResult === -1) {
      // this.maximum < _other.maximum
      return false
    } else {
      // this.maximum >= _other.maximum
      return true
    }
  }

  private getTypeConfig = (value?: T) => {
    return TypeConfigs.get(value)
  }

  private getTypeConfigByMinOrMax = (params: { minimum?: T, maximum?: T }) => {
    if (this.isPresent(params.minimum) && this.isPresent(params.maximum)) {
      const minConf = this.getTypeConfig(params.minimum)
      const maxConf = this.getTypeConfig(params.maximum)
      if (minConf !== maxConf) { throw new Error('minimum type and maximum type are not much.') }
      return minConf
    } else if (params.minimum) {
      const minConf = this.getTypeConfig(params.minimum)
      return minConf
    } else if (params.maximum) {
      const maxConf = this.getTypeConfig(params.maximum)
      return maxConf
    } else {
      throw new Error('from or to must be present.')
    }
  }

  private isPresent = (value?: unknown) => {
    if (value === null) { return false }
    if (value === undefined) { return false }
    return true
  }

  private isTypeEquals = (other: Rangerange<T>) => {
    const otherTypeConfig = this.getTypeConfigByMinOrMax({
      minimum: other.minimum,
      maximum: other.maximum,
    })

    return this.typeConfig === otherTypeConfig
  }
}
