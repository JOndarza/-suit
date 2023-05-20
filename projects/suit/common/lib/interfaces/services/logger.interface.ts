import { EventEmitter } from '@angular/core';

import { TypeLog } from '../../enums/services/logger.enum';

export interface ISuitLoggerStyle {
  base: string;
  debug: string;
  success: string;
  error: string;
  info: string;
  warn: string;
}

export interface ISuitLog {
  message?: string;
  aditionals?: any;
  reference?: any;
}

export interface ISuitLogged extends ISuitLog {
  type: TypeLog;
  timespan?: Date;
  style?: string;
}

export interface ISuitLoggedConfig {
  style: string;
  emitter: EventEmitter<ISuitLogged>;
  optionalParams: any[];
}
