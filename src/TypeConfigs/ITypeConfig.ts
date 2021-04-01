export default interface ITypeConfig<T> {
  name: string
  compareFunc: (base: T, other: T) => -1 | 0 | 1
  succFunc?: (current: T) => T
}
