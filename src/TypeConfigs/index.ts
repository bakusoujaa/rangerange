import ITypeConfig from './ITypeConfig'
import Integer from './Integer'
import Char from './Char'

export default class TypeConfigs {
  private static configs: ITypeConfig<any>[] = [
    Integer,
    Char,
  ]

  public static get all() {
    return TypeConfigs.configs
  }

  public static get = (name: string) => {
    const config = TypeConfigs.configs.find((config) =>{
      return config.name === name
    })
    if (!config) { throw new Error('type config could not found.') }

    return config
  }

  public static register = <T>(config: ITypeConfig<T>) => {
    TypeConfigs.configs.push(config)
  }
}
