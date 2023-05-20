import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { SuitLogger } from '@suit/common';

@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet>',
})
export class AppComponent {
  constructor(private _fb: FormBuilder, private _logger: SuitLogger) {
    // this._logger.debug({ message: 'debug!' });
    // this._logger.success({ message: 'success!' });
    // this._logger.error({ message: 'error!' });
    // this._logger.info({ message: 'info!' });
    // this._logger.warn({ message: 'warn!' });
    // console.table(this._logger.getHistory());
  }
}
