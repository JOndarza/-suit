export enum AnchorVertical {
  Top = 1,
  Center = 2,
  Bottom = 3,
}

export enum AnchorHorizontal {
  Left = 1,
  Center = 2,
  Right = 3,
}

export interface IAnchor {
  vertical: AnchorVertical;
  horizontal: AnchorHorizontal;
}
