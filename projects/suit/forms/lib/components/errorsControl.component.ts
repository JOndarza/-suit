import { Component, Input } from '@angular/core';

@Component({
  selector: 'suit-errors-control',
  template: `
    <ul>
      <li *ngFor="let error of errors">
        {{ error }}
      </li>
    </ul>
  `,
})
export class SuitErrorsControlComponent {
  private _errors: string[];
  public get errors() {
    return this._errors;
  }
  @Input()
  public set errors(v: string[]) {
    this._errors = v || [];
  }
}
