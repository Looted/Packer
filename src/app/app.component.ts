import { Component, OnInit } from '@angular/core';
import {
  Activity,
  ActivityType,
  HasName,
  Item,
  ItemCategory,
  Modifier,
} from './models';
import * as R from 'ramda';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  selectedActivities: string[] = [];
  selectedModifiers: Modifier[] = [];

  activities: Activity[] = [
    {
      name: 'Podróż zagraniczna',
      types: [ActivityType.Travel],
      modifiers: [Modifier.Lato],
      items: [
        { name: 'Lokalna waluta / revolut', category: ItemCategory.Inne },
        { name: 'Paszport / dokumenty', category: ItemCategory.Inne },
        { name: 'Aparat', category: ItemCategory.Elektronika },
        { name: 'Ładowarka', category: ItemCategory.Elektronika },
        { name: 'Laptop', category: ItemCategory.Elektronika },
        { name: 'Czytnik E-Book', category: ItemCategory.Elektronika },
        { name: 'Słuchawki', category: ItemCategory.Elektronika },
        { name: 'Bielizna', category: ItemCategory.Ubrania },
        { name: 'Spodnie długie', category: ItemCategory.Ubrania },
        { name: 'Spodnie krótkie', category: ItemCategory.Ubrania },
        { name: 'Koszule', category: ItemCategory.Ubrania },
        { name: 'T-Shirt', category: ItemCategory.Ubrania },
        { name: 'Szczoteczka do zębów', category: ItemCategory.Inne },
        { name: 'Klapki', category: ItemCategory.Obuwie },
        { name: 'Blokery do uszu', category: ItemCategory.Inne },
        {
          name: 'Okulary przeciwsłoneczne',
          category: ItemCategory.Inne,
          modifiers: [Modifier.Lato],
        },
        {
          name: 'Sandały',
          category: ItemCategory.Obuwie,
          modifiers: [Modifier.Lato],
        },
      ],
    },
    {
      name: 'Trekking',
      types: [ActivityType.Sport],
      modifiers: [Modifier.Lato],
      items: [
        { name: 'Kurtka przeciwdeszczowa', category: ItemCategory.Ubrania },
        { name: 'Buty trekkingowe', category: ItemCategory.Obuwie },
        { name: 'Spodnie trekkingowe', category: ItemCategory.Ubrania },
        { name: 'T-Shirt trekkingowy', category: ItemCategory.Ubrania },
        { name: 'Bielizna trekkingowa', category: ItemCategory.Ubrania },
        { name: 'Czapka', category: ItemCategory.Ubrania },
        { name: 'Plecak', category: ItemCategory.Inne },
        { name: 'Czołówka', category: ItemCategory.Elektronika },
        { name: 'Powerbank', category: ItemCategory.Elektronika },
        { name: 'Polar', category: ItemCategory.Ubrania },
        {
          name: 'Okulary przeciwsłoneczne',
          category: ItemCategory.Inne,
          modifiers: [Modifier.Lato, Modifier.Zima],
        },
        {
          name: 'Sandały',
          category: ItemCategory.Obuwie,
          modifiers: [Modifier.Lato],
        },
      ],
    },
    {
      name: 'Via Ferrata',
      types: [ActivityType.Sport],
      modifiers: [Modifier.Lato],
      items: [
        {
          name: 'Rękawiczki skórzane bez palców',
          category: ItemCategory.Ubrania,
        },
        { name: 'Plecak', category: ItemCategory.Inne },
        { name: 'Czołówka', category: ItemCategory.Elektronika },
      ],
    },
  ];

  possibleItems: Item[] = [];
  itemsGroupedByCategory: Record<ItemCategory, Item[]>;
  selectedItems: Item[] = [];

  ngOnInit() {
    this.selectedActivities =
      JSON.parse(window.localStorage.getItem('selectedActivities')) || [];
    this.selectedItems =
      JSON.parse(window.localStorage.getItem('selectedItems')) || [];
    this.recalculateItems();
  }

  toggleActivity(activityName: string) {
    if (this.selectedActivities.includes(activityName)) {
      this.selectedActivities = this.selectedActivities.filter(
        (x) => x !== activityName
      );
    } else {
      this.selectedActivities = [...this.selectedActivities, activityName];
    }

    window.localStorage.setItem(
      'selectedActivities',
      JSON.stringify(this.selectedActivities)
    );

    this.recalculateItems();
  }

  toggleItem(item: Item) {
    if (this.selectedItems.includes(item)) {
      this.selectedItems = this.selectedItems.filter((x) => x !== item);
    } else {
      this.selectedItems = [...this.selectedItems, item];
    }

    window.localStorage.setItem(
      'selectedItems',
      JSON.stringify(this.selectedItems)
    );
  }

  recalculateItems() {
    const selectedActivities = this.activities.filter((x) =>
      this.selectedActivities.includes(x.name)
    );
    this.possibleItems = R.uniqBy(
      (x) => x.name,
      R.flatten(R.map((x) => x.items, selectedActivities))
    );

    this.itemsGroupedByCategory = R.groupBy(
      (x) => x.category,
      this.possibleItems
    );
  }

  isActivitySelected(activityName: string) {
    return this.selectedActivities.includes(activityName);
  }

  isItemSelected(item: Item) {
    return this.selectedItems.includes(item);
  }

  categoryTrackBy(category: ItemCategory) {}

  itemTrackBy(index, item: HasName) {
    return item.name;
  }

  saveSelection() {}
}
