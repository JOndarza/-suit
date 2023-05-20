import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SuitPopupComponent } from './component/popup.component';

@NgModule({
  declarations: [SuitPopupComponent],
  exports: [SuitPopupComponent],
  imports: [CommonModule],
})
export class SuitPopupModule {}
