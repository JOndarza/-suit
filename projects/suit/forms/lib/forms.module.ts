import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SuitContainerControlComponent } from './components/containerControl.component';
import { SuitErrorsControlComponent } from './components/errorsControl.component';
import { SuitControlDirective } from './directives/control.directive';
import { SuitFormGroupDirective } from './directives/formGroup.directive';

const _declarations = [
  SuitContainerControlComponent,
  SuitErrorsControlComponent,
  SuitFormGroupDirective,
  SuitControlDirective,
];

@NgModule({
  declarations: _declarations,
  exports: _declarations,
  imports: [CommonModule],
})
export class SuitFormsModule {}
