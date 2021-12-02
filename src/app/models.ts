export interface HasName {
  name: string;
}

export enum Modifier {
  Lato,
  Zima,
  Jesień,
}

export enum ActivityType {
  Sport,
  Travel,
}

export enum ItemCategory {
  Ubrania = 'Ubrania',
  Obuwie = 'Obuwie',
  Elektronika = 'Elektronika',
  Inne = 'Inne',
}

export class Item implements HasName {
  name: string;
  modifiers?: Modifier[];
  category: ItemCategory;
}

export class Activity implements HasName {
  name: string;
  types: ActivityType[];
  modifiers: Modifier[];
  items: Item[];
}
