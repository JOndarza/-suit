import { Directive, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

@Directive()
export class ReactiveBase implements OnDestroy {
  protected _subscriptions: Array<Subscription> = [];

  ngOnDestroy() {
    this._subscriptions.forEach((x) => x.unsubscribe());
  }

  public addSubscriptions(...s: Array<Subscription>) {
    s.forEach((x) => this._subscriptions.push(x));
  }
}
