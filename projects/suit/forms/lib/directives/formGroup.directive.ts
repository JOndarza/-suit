import { Directive, HostListener, Input } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormControl,
  FormGroup,
} from '@angular/forms';

@Directive({
  selector: '[formGroup]',
})
export class SuitFormGroupDirective {
  @Input()
  formGroup: FormGroup;

  @HostListener('submit')
  onSubmit() {
    this.markAsTouchedAndDirty(this.formGroup);
  }

  markAsTouchedAndDirty(control: AbstractControl) {
    if (control instanceof FormGroup) {
      Object.keys(control.controls).forEach((key) =>
        this.markAsTouchedAndDirty(control.controls[key])
      );
    } else if (control instanceof FormArray) {
      control.controls.forEach((c) => this.markAsTouchedAndDirty(c));
    } else if (control instanceof FormControl && control.enabled) {
      control.markAsDirty();
      control.markAsTouched();
      control.updateValueAndValidity();
    }
  }
}
