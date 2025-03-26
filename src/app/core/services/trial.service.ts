import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map, Observable} from 'rxjs';
import {StudyModel} from '../models/study.model';
import {fromStudyDtoToStudyModelMapper} from '../mappers/fromStudyDtoToStudyModel.mapper';
import {StudyDto} from '../dtos/study.dto';

@Injectable({
  providedIn: 'root'
})
export class TrialService {

  constructor(private http: HttpClient) { }

  getStudies(): Observable<StudyModel[]> {
    return this.http.get<{ studies: StudyDto[], nextPageToken: string }>('https://clinicaltrials.gov/api/v2/studies').pipe(
      map((response: { studies: StudyDto[], nextPageToken: string }) => {
        return response.studies.map((r: any) => fromStudyDtoToStudyModelMapper(r));
      })
    );
  }
}
