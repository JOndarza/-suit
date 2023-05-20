import { Component } from '@angular/core';
import { SuitLogger } from '@suit/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'demo';

  constructor(private _logger: SuitLogger) {
    this._logger.debug({ message: 'HI!' });
    this._logger.success({ message: 'HI!' });
    this._logger.error({ message: 'HI!' });
    this._logger.info({ message: 'HI!' });
    this._logger.warn({ message: 'HI!' });

    console.table(this._logger.getHistory());
  }
}
