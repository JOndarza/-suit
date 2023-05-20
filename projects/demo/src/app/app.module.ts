import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { SuitLogger, SuitLoggerConfig } from '@suit/common';
import { SuitFormsModule } from '@suit/forms';
import { SuitPopupModule } from '@suit/popup';

import { AppComponent } from './app.component';

export const ROUTES: Routes = [
  {
    path: '',
    redirectTo: 'layout',
    pathMatch: 'full',
  },
  {
    path: 'layout',
    loadChildren: () =>
      import('./layout/layout.module').then((x) => x.LayoutModule),
  },
];

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    SuitPopupModule,
    SuitFormsModule,
    RouterModule.forRoot(ROUTES, {
      useHash: true,
      preloadingStrategy: PreloadAllModules,
    }),
  ],
  providers: [SuitLoggerConfig, SuitLogger],
  bootstrap: [AppComponent],
})
export class AppModule {}
