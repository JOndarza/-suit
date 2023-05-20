import { TypeLog } from './../../enums/services/logger.enum';
import { Injectable } from '@angular/core';

import { ISuitLoggerStyle } from '../../interfaces/services/logger.interface';

@Injectable({ providedIn: 'root' })
export class SuitLoggerConfig {
  public enable: boolean = true;
  public maximumHistoryEntries: number = 20;
  public filter: TypeLog[] | null = null;
  public style: ISuitLoggerStyle = {
    base: 'border-radius: 2px',
    debug: 'background-color: gray',
    success: 'background-color: green',
    error: 'background-color: red',
    info: 'background-color: blue',
    warn: 'background-color: orange',
  };
}
