import { Injectable, signal } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { StudyModel } from '../models/study.model';
import { fromStudyDtoToStudyModelMapper } from '../mappers/fromStudyDtoToStudyModel.mapper';
import { StudyDto } from '../dtos/study.dto';

@Injectable({
  providedIn: 'root'
})
export class TrialService {
  private _studyList: StudyModel[] = [];
  private _pageToken = '';

  studiesSignal = signal<StudyModel[]>([]);

  constructor(private http: HttpClient) { }

  private getStudyHttpRequest(pageSize = 10, pageToken = ''): Observable<{ studies: StudyDto[], nextPageToken: string }>{
    let httpParams = new HttpParams()
      .set('pageSize', pageSize);
    if (pageToken) {
      httpParams = httpParams.set('pageToken', pageToken);
    }
    return this.http.get<{ studies: StudyDto[], nextPageToken: string }>('https://clinicaltrials.gov/api/v2/studies', { params: httpParams });
  }

  getStudies(): Observable<StudyModel[]> {
    return this.getStudyHttpRequest().pipe(
      map((response: { studies: StudyDto[], nextPageToken: string }) => {
        return response.studies.map((r: StudyDto) => fromStudyDtoToStudyModelMapper(r));
      })
    );
  }

  getRandomStudyInterval(): Observable<StudyModel[]> {
    return this.getStudyHttpRequest(1, this._pageToken).pipe(
      map((response: { studies: StudyDto[], nextPageToken: string }) => {
        this._pageToken = response.nextPageToken;
        this._studyList.unshift(fromStudyDtoToStudyModelMapper(response.studies[0]));
        if (this._studyList.length > 10) {
          this._studyList = this._studyList.slice(0, 10);
        }
        return [...this._studyList];
      })
    );
  }
}
