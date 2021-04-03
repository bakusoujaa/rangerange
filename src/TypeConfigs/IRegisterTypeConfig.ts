export default interface IRegisterTypeConfig<T> {
  typeMatchFunc: (value: unknown) => boolean
  compareFunc: (base: T, other: T) => -1 | 0 | 1
  stepBy?: (current: T, step: number) => T
}
