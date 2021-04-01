import ITypeConfig from './ITypeConfig'

const compareFunc = (base: number, other: number) => {
  if (base < other) { return -1 }
  if (base === other) { return 0 }
  if (base > other) { return 1 }
}
const succFunc = (current: number) => {
  if (current % 1 !== 0) { throw new Error('float could not iterate.') }
  return current + 1
}

const config: ITypeConfig<number> = { name: "number", compareFunc, succFunc }

export default config
