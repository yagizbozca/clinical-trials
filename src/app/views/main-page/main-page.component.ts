import { Component, OnInit } from '@angular/core';
import { ListComponent } from '../../shared/components/list/list.component';
import { TrialService } from '../../core/services/trial.service';
import { StudyModel } from '../../core/models/study.model';
import { MatSlideToggle } from '@angular/material/slide-toggle';
import { MatButton } from '@angular/material/button';
import { FavoritesService } from '../../core/services/favorites.service';

@Component({
  selector: 'app-main-page',
  imports: [
    ListComponent,
    MatSlideToggle,
    MatButton
  ],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.css'
})
export class MainPageComponent implements OnInit {
  private _selectedItems: StudyModel[] = [];
  private _autoFetch = false;
  private _randomFetcherInterval!: ReturnType<typeof setInterval>;

  constructor(
    private favoriteService: FavoritesService,
    protected trialService: TrialService) { }

  private loadStudies(): void {
    this.trialService.getStudies().subscribe(studies => this.trialService.studiesSignal.set(studies));
  }

  private randomStudyList(): void {
    this.trialService.getRandomStudyInterval().subscribe(studies => this.trialService.studiesSignal.set(studies));
  }

  protected onAutoFetchChange(): void {
    this._autoFetch = !this._autoFetch;
    if (this._autoFetch) {
      this.randomStudyList();
      this._randomFetcherInterval = setInterval(() => {
        this.randomStudyList();
      }, 5000);
    } else {
      if (this._randomFetcherInterval) {
        clearInterval(this._randomFetcherInterval);
      }
      this.loadStudies();
    }
  }

  protected updateSelectedItems(studies: StudyModel[]): void {
    this._selectedItems = studies;
  }

  protected addFavorite(): void {
    this.favoriteService.addFavorite(this._selectedItems);
  }

  ngOnInit() {
    this.loadStudies();
  }
}
