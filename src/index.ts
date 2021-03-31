const numberCompareFunc = (base: number, other: number) => {
  if (base < other) { return -1 }
  if (base === other) { return 0 }
  if (base > other) { return 1 }
}
const numberSucc = (current: number) => {
  if (current % 1 !== 0) { throw new Error('float could not iterate.') }
  return current + 1
}

export default class Rangerange<T> {
  private static types = [
    { name: "number", compareFunc: numberCompareFunc, succFunc: numberSucc }
  ]
  // public static register = (params: any) => {

  // }

  private readonly minimum?: T
  private readonly maximum?: T
  private readonly typeConfig: any

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
    const config = Rangerange.types.find((type) => {
      return this.getType(value) === type.name
    })
    if (!config) { throw new Error('unregistered type.') }
    return config
  }
}
