import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { SuitLogger, SuitLoggerConfig } from '@suit/common';
import { SuitDatepickerModule } from '@suit/datepicker';
import { SuitPopupModule } from '@suit/popup';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, SuitPopupModule, SuitDatepickerModule],
  providers: [SuitLoggerConfig, SuitLogger],
  bootstrap: [AppComponent],
})
export class AppModule {}
