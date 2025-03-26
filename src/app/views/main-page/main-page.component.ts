import {Component, OnInit} from '@angular/core';
import {ListComponent} from '../../shared/components/list/list.component';
import {TrialService} from '../../core/services/trial.service';
import {StudyModel} from '../../core/models/study.model';
import {Observable} from 'rxjs';
import {AsyncPipe} from '@angular/common';
import {MatSlideToggle} from '@angular/material/slide-toggle';
import {MatButton} from '@angular/material/button';

@Component({
  selector: 'app-main-page',
  imports: [
    ListComponent,
    AsyncPipe,
    MatSlideToggle,
    MatButton
  ],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.css',
  providers: [TrialService]
})
export class MainPageComponent implements OnInit {
  private autoFetch = false;

  protected studies$!: Observable<StudyModel[]>;

  constructor(private trialService: TrialService) {}

  protected onAutoFetchChange(): void {
    this.autoFetch = !this.autoFetch;
    console.log(this.autoFetch);
  }

  ngOnInit() {
    this.studies$ = this.trialService.getStudies();
  }
}
