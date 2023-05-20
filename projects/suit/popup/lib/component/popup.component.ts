import {
  ChangeDetectorRef,
  Component,
  HostListener,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { ComponentBase, SuitLogger } from '@suit/common';

import { AnchorHorizontal, AnchorVertical, IAnchor } from '../common';

@Component({
  selector: 'suit-popup',
  templateUrl: './popup.template.html',
  styleUrls: ['./popup.styles.scss'],
})
export class SuitPopupComponent
  extends ComponentBase
  implements OnInit, OnDestroy
{
  @Input()
  public target: HTMLElement;
  @Input()
  public targetAnchor: IAnchor;
  @Input()
  public contentAnchor: IAnchor;
  @Input()
  public popopClass: string | Array<string>;

  private _opened: boolean;
  public get opened(): boolean {
    return this._opened;
  }

  private _content: HTMLElement;

  constructor(private _cdRef: ChangeDetectorRef, private _logger: SuitLogger) {
    super();
  }

  ngOnInit() {
    if (!this.targetAnchor)
      this.targetAnchor = {
        vertical: AnchorVertical.Bottom,
        horizontal: AnchorHorizontal.Left,
      };

    if (!this.contentAnchor)
      this.contentAnchor = {
        vertical: AnchorVertical.Top,
        horizontal: AnchorHorizontal.Left,
      };

    if (!this.target)
      this._logger.error({
        message: `POPUP #${this.id}: 'Target' not defined.`,
        reference: this,
      });
  }

  ngOnDestroy() {
    this._content?.parentNode.removeChild(this._content);
    super.ngOnDestroy();
  }

  @HostListener('document:click', ['$event'])
  public documentClick(event: any) {
    if (this._opened && !this.contains(event.target)) this.close();
  }

  // #region Privates
  public toggle() {
    if ((this._opened = !this._opened)) this.calculatePosition();
  }

  public open() {
    this._opened = true;
    this.calculatePosition();
  }

  public close() {
    this._opened = false;
  }

  public calculatePosition() {
    this._cdRef.detectChanges();
    if (!this.open || !this.target) return;

    this._content = document.getElementById(this.id);
    document.body.appendChild(this._content);

    const shapeTarget = this.target.getBoundingClientRect();
    const shapeContent = this._content.getBoundingClientRect();

    const posY = this.calculateVerticalPosition(shapeTarget, shapeContent);
    const posX = this.calculateHorizontalPosition(shapeTarget, shapeContent);

    this.setPosition(posX, posY);
  }
  // #endregion

  // #region Private
  private contains(target: any) {
    return this.target.contains(target) || this._content.contains(target);
  }

  private setPosition(x: number, y: number) {
    const style = `left: ${x}px; top: ${y}px;`;
    this._content.style.cssText = style;
  }

  private calculateVerticalPosition(target: DOMRect, content: DOMRect) {
    let valueTarget = 0;
    let valueContent = 0;

    // Target
    switch (this.targetAnchor.vertical) {
      case AnchorVertical.Top:
        valueTarget = target.top;
        break;
      case AnchorVertical.Center:
        valueTarget = target.top + target.height / 2;
        break;
      case AnchorVertical.Bottom:
        valueTarget = target.top + target.height;
        break;
    }

    // Content
    switch (this.contentAnchor.vertical) {
      case AnchorVertical.Top:
        valueContent = 0;
        break;
      case AnchorVertical.Center:
        valueContent = -content.height / 2;
        break;
      case AnchorVertical.Bottom:
        valueContent = -content.height;
        break;
    }

    return valueTarget + valueContent;
  }

  private calculateHorizontalPosition(target: DOMRect, content: DOMRect) {
    let valueTarget = 0;
    let valueContent = 0;

    // Target
    switch (this.targetAnchor.horizontal) {
      case AnchorHorizontal.Left:
        valueTarget = target.left;
        break;
      case AnchorHorizontal.Center:
        valueTarget = target.left + target.width / 2;
        break;
      case AnchorHorizontal.Right:
        valueTarget = target.left + target.width;
        break;
    }

    // Content
    switch (this.contentAnchor.horizontal) {
      case AnchorHorizontal.Left:
        valueContent = 0;
        break;
      case AnchorHorizontal.Center:
        valueContent = -content.width / 2;
        break;
      case AnchorHorizontal.Right:
        valueContent = -content.width;
        break;
    }

    return valueTarget + valueContent;
  }
  // #endregion
}
