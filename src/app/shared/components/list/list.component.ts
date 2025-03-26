import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {StudyModel} from '../../../core/models/study.model';
import {MatCheckbox} from '@angular/material/checkbox';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrl: './list.component.css',
  imports: [
    MatCheckbox
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListComponent {
  @Input() listData: StudyModel[] | null = [];
}
