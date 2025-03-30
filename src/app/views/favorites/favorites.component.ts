import { Component } from '@angular/core';
import { ListComponent } from '../../shared/components/list/list.component';
import { MatButton } from '@angular/material/button';
import { FavoritesService } from '../../core/services/favorites.service';
import { StudyModel } from '../../core/models/study.model';

@Component({
  selector: 'app-favorites',
  imports: [
    MatButton,
    ListComponent,
    MatButton
  ],
  templateUrl: './favorites.component.html',
  styleUrl: './favorites.component.css'
})
export class FavoritesComponent {
  private _selectedItems: StudyModel[] = [];

  constructor(protected favoriteService: FavoritesService) {
  }

  protected updateSelectedItems(studies: StudyModel[]): void {
    this._selectedItems = studies;
  }

  protected removeFavorite(): void {
    this.favoriteService.removeFavorite(this._selectedItems);
  }
}
