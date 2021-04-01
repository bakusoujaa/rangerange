import ITypeConfig from './ITypeConfig'

const compareFunc = (base: string, other: string) => {
  if (base.length !== 1) { throw new Error('char must be 1 length.') }
  if (other.length !== 1) { throw new Error('char must be 1 length.') }

  if (base.charCodeAt(0) < other.charCodeAt(0)) { return -1 }
  if (base.charCodeAt(0) === other.charCodeAt(0)) { return 0 }
  if (base.charCodeAt(0) > other.charCodeAt(0)) { return 1 }
  throw new Error('unknown char code.')
}
const succFunc = (current: string) => {
  if (current.length !== 1) { throw new Error('char must be 1 length.') }
  return String.fromCodePoint(current.charCodeAt(0) + 1)
}

const config: ITypeConfig<string> = { name: "string", compareFunc, succFunc }

export default config
