import { Directive, Input } from '@angular/core';

import { generateId } from '../functions/generate.function';
import { ILoader } from '../interfaces/components/loader.interface';
import { ReactiveBase } from './reactive.base';

@Directive()
export class ComponentBase extends ReactiveBase implements ILoader {
  @Input()
  public loading: boolean;

  private _id: string = generateId('C-');
  public get id(): string {
    return this._id;
  }
}
