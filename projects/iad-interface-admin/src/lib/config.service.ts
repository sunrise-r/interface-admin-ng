import { IadModuleConfig, IadModuleConfigInterface } from './config';

export class IadConfigService {
  CONFIG_OPTIONS: IadModuleConfig;

  constructor(moduleConfig?: IadModuleConfigInterface) {
    this.CONFIG_OPTIONS = {
      ...new IadModuleConfig(),
      ...moduleConfig
    };
  }

  getConfig(): IadModuleConfig {
    return this.CONFIG_OPTIONS;
  }
}
