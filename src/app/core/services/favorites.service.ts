import { Injectable, signal } from '@angular/core';
import { StudyModel } from '../models/study.model';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {
  favoriteList = signal<StudyModel[]>([]);

  constructor() { }

  addFavorite(favorites: StudyModel[]) {
    this.favoriteList.update((items) => {
      const filteredItems = items.filter(i => !favorites.some(f => i.id === f.id));
      return [...favorites, ...filteredItems];
    })
  }

  removeFavorite(favorites: StudyModel[]) {
    this.favoriteList.update((items) => {
      return items.filter((item) => !favorites.includes(item));
    })
  }
}
