import {
  Directive,
  Host,
  HostBinding,
  Optional,
  SkipSelf,
} from '@angular/core';
import { ControlContainer, NgControl } from '@angular/forms';
import { ComponentBase } from '@suit/common';

@Directive({
  selector: '.suit-control',
})
export class SuitControlDirective extends ComponentBase {
  get form() {
    return this._container?.formDirective;
  }

  get control() {
    return this._control;
  }

  @HostBinding('class.valid')
  get classValid() {
    return (
      this.control &&
      this.control.valid &&
      (this.control.touched || this.control.dirty)
    );
  }

  @HostBinding('class.invalid')
  get classInvalid() {
    return (
      this.control &&
      this.control.invalid &&
      this.control.touched &&
      this.control.dirty
    );
  }

  constructor(
    @Optional()
    @Host()
    @SkipSelf()
    private _container: ControlContainer,
    @Optional()
    private _control: NgControl
  ) {
    super();
  }
}
