import {
  AfterContentInit,
  Component,
  ContentChildren,
  HostBinding,
  QueryList,
} from '@angular/core';
import { ComponentBase } from '@suit/common';
import { debounceTime, merge } from 'rxjs';

import { SuitControlDirective } from '../directives/control.directive';

@Component({
  selector: '.suit-container-control',
  template: `
    <ng-content></ng-content>
    <suit-errors-control [errors]="errors"></suit-errors-control>
  `,
})
export class SuitContainerControlComponent
  extends ComponentBase
  implements AfterContentInit
{
  @ContentChildren(SuitControlDirective, { descendants: true })
  private _controls: QueryList<SuitControlDirective>;

  private _errors: string[];
  public get errors() {
    return this._errors;
  }

  @HostBinding('class.with-errors')
  get hasErrors() {
    return this._controls.some(
      (c) => !c.control.valid && c.control.dirty && c.control.touched
    );
  }

  @HostBinding('class.without-errors')
  get hasSuccess() {
    return (
      !this._controls.some((c) => !c.control.valid) &&
      this._controls.some((c) => c.control.dirty && c.control.touched)
    );
  }

  ngAfterContentInit() {
    this.addSubscriptions(
      merge(...this._controls.map((x) => x.control.statusChanges))
        .pipe(debounceTime(150))
        .subscribe(this.getErrors.bind(this))
    );
  }

  private getErrors() {
    this._errors = this._controls
      .filter((x) => x.control.invalid)
      .map((x) => Object.keys(x.control.errors))
      .reduce((x, y) => (x || []).concat(y || []), []);
  }
}
