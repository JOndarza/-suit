import { EventEmitter, Injectable } from '@angular/core';

import { TypeLog } from '../../enums/services/logger.enum';
import {
  ISuitLoggedConfig,
  ISuitLog,
  ISuitLogged,
} from '../../interfaces/services/logger.interface';
import { SuitLoggerConfig } from './loggerConfig.service';

@Injectable({ providedIn: 'root' })
export class SuitLogger {
  private _emitters: any = {};
  private _history: ISuitLogged[] = [];

  constructor(private _service: SuitLoggerConfig) {}

  public getEmitter(type: TypeLog) {
    const emitter =
      this._emitters[type] ||
      (this._emitters[type] = new EventEmitter<ISuitLogged>());

    return emitter;
  }

  public getHistory() {
    return this._history;
  }

  public clearHistory() {
    this._history = [];
  }

  public log(data: ISuitLogged, config: ISuitLoggedConfig) {
    if (!this._service.enable) return;

    this.addHistory(data);
    if (this.areFiltered(data)) return;

    //   LABEL
    console.log(
      `%c${(data.timespan || new Date()).toLocaleString()} - ${TypeLog[
        data.type
      ]?.toUpperCase()} - ${data.message}`,
      config.style
    );
    if (!!data.aditionals) console.log(data.aditionals);
    if (!!data.reference) console.log(data.reference);
    config.emitter?.emit(data);
  }

  public debug(data: ISuitLog) {
    this.logByType(Object.assign({ type: TypeLog.debug }, data));
  }

  public success(data: ISuitLog) {
    this.logByType(Object.assign({ type: TypeLog.success }, data));
  }

  public error(data: ISuitLog) {
    this.logByType(Object.assign({ type: TypeLog.error }, data));
  }

  public info(data: ISuitLog) {
    this.logByType(Object.assign({ type: TypeLog.info }, data));
  }

  public warn(data: ISuitLog) {
    this.logByType(Object.assign({ type: TypeLog.warn }, data));
  }

  private logByType(data: ISuitLogged) {
    data.timespan = new Date();

    const config = this.configByType(data);
    config.style = [this._service.style.base, config.style || []].join(';');

    this.log(data, config);
  }

  private configByType(data: ISuitLogged) {
    let style: string | null = null;

    switch (data.type) {
      case TypeLog.debug:
        style = this._service.style.debug;
        break;
      case TypeLog.success:
        style = this._service.style.success;
        break;
      case TypeLog.error:
        style = this._service.style.error;
        break;
      case TypeLog.info:
        style = this._service.style.info;
        break;
      case TypeLog.warn:
        style = this._service.style.warn;
        break;
    }

    const emitter = this.getEmitter(data.type);
    return <ISuitLoggedConfig>{ style, emitter };
  }

  private addHistory(data: ISuitLogged) {
    this._history.push(data);

    if (this._history.length < this._service.maximumHistoryEntries) return;

    const index = this._history.length - this._service.maximumHistoryEntries;
    this._history = this._history.slice(index - 0);
  }

  private areFiltered(data: ISuitLogged) {
    return this._service.filter?.some((x) => x === data?.type) ?? false;
  }
}
