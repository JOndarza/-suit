import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { SuitLogger, SuitLoggerConfig } from '@suit/common';
import { SuitFormsModule } from '@suit/forms';
import { SuitPopupModule } from '@suit/popup';

import { LayoutComponent } from './layout.component';

const routes: Routes = [
  { path: '', redirectTo: 'main', pathMatch: 'full' },
  {
    path: 'main',
    component: LayoutComponent,
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SuitPopupModule,
    SuitFormsModule,
  ],
  declarations: [LayoutComponent],
  providers: [SuitLoggerConfig, SuitLogger],
})
export class LayoutModule {}
