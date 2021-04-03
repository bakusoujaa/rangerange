import IRegisterTypeConfig from './IRegisterTypeConfig'

const typeMatchFunc = (value: unknown) => {
  if (typeof value !== 'number') { return false }

  return value % 1 === 0
}

const compareFunc = (base: number, other: number) => {
  if (base < other) { return -1 }
  if (base === other) { return 0 }
  if (base > other) { return 1 }

  throw new Error('compare check failed.')
}

const stepBy = (current: number, step: number) => {
  if (current % 1 !== 0) { throw new Error('char must be 1 length.') }

  return current + step
}

const config: IRegisterTypeConfig<number> = { typeMatchFunc, compareFunc, stepBy }

export default config
