import { Injectable } from '@angular/core';
import { IadModuleConfig } from './config';

@Injectable({
  providedIn: 'root'
})
export class IadConfigService {
  CONFIG_OPTIONS: IadModuleConfig;

  constructor(moduleConfig?: IadModuleConfig) {
    this.CONFIG_OPTIONS = {
      ...new IadModuleConfig(),
      ...moduleConfig
    };
  }

  getConfig(): IadModuleConfig {
    return this.CONFIG_OPTIONS;
  }
}
