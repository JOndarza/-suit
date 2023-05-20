import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './layout.template.html',
})
export class LayoutComponent implements OnInit {
  private _form: FormGroup;
  public get form() {
    return this._form;
  }

  constructor(private _fb: FormBuilder) {}

  ngOnInit() {
    this._form = this._fb.group({
      'input-text': [null, [Validators.required, Validators.minLength(10)]],
    });
  }
}
