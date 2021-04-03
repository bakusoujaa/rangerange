import IRegisterTypeConfig from './IRegisterTypeConfig'
import Integer from './Integer'
import Char from './Char'

export default class TypeConfigs {
  private static configs: IRegisterTypeConfig<any>[] = [
    Integer,
    Char,
  ]

  public static get all() {
    return TypeConfigs.configs
  }

  public static get = (value: unknown) => {
    const config = TypeConfigs.configs.find((config) =>{
      return config.typeMatchFunc(value)
    })
    if (!config) { throw new Error('type config could not found.') }

    return config
  }

  public static register = <T>(config: IRegisterTypeConfig<T>) => {
    TypeConfigs.configs.push(config)
  }
}
