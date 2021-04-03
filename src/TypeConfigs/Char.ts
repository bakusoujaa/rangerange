import IRegisterTypeConfig from './IRegisterTypeConfig'

const typeMatchFunc = (value: unknown) => {
  if (typeof value !== 'string') { return false }

  return value.length === 1
}

const compareFunc = (base: string, other: string) => {
  if (base.length !== 1) { throw new Error('char must be 1 length.') }
  if (other.length !== 1) { throw new Error('char must be 1 length.') }

  if (base.charCodeAt(0) < other.charCodeAt(0)) { return -1 }
  if (base.charCodeAt(0) === other.charCodeAt(0)) { return 0 }
  if (base.charCodeAt(0) > other.charCodeAt(0)) { return 1 }

  throw new Error('unknown char code.')
}

const stepBy = (current: string, step: number) => {
  if (current.length !== 1) { throw new Error('char must be 1 length.') }

  return String.fromCodePoint(current.charCodeAt(0) + step)
}

const config: IRegisterTypeConfig<string> = { typeMatchFunc, compareFunc, stepBy }

export default config
