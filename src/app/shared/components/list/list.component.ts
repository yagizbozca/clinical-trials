import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { StudyModel } from '../../../core/models/study.model';
import { MatCheckbox } from '@angular/material/checkbox';

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
  @Output() checkedChange: EventEmitter<StudyModel[]> = new EventEmitter();

  private _selectedItems: StudyModel[] = [];

  protected onCheckboxChange(study: StudyModel): void {
    if (this._selectedItems.includes(study)) {
      this._selectedItems = this._selectedItems.filter(s => s.id !== study.id);
    } else {
      this._selectedItems.push(study);
    }
    this.checkedChange.emit(this._selectedItems);
  }
}
