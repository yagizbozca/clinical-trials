import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { MainPageComponent } from './main-page.component';
import { TrialService } from '../../core/services/trial.service';
import { of } from 'rxjs';
import { signal } from '@angular/core';

describe('MainPageComponent', () => {
  let component: MainPageComponent;
  let fixture: ComponentFixture<MainPageComponent>;
  let trialServiceSpy: jasmine.SpyObj<TrialService>;

  beforeEach(async () => {
    trialServiceSpy = jasmine.createSpyObj(
      'TrialService',
      ['getStudies', 'getRandomStudyInterval'],
      { studiesSignal: signal([]) });
    trialServiceSpy.getStudies.and.returnValue(of([]));
    trialServiceSpy.getRandomStudyInterval.and.returnValue(of([]));

    await TestBed.configureTestingModule({
      imports: [MainPageComponent],
      providers: [
        { provide: TrialService, useValue: trialServiceSpy }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MainPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getStudies method of TrialService when ngOnInit executed', () => {
    expect(trialServiceSpy.getStudies).toHaveBeenCalledTimes(1);
  });

  it('should call getRandomStudyInterval of TrialService repeatedly every 5 seconds when toggle is on', fakeAsync(() => {
    // To be able to call a protected/private method
    (component as unknown as { onAutoFetchChange: () => void })['onAutoFetchChange']();

    expect(trialServiceSpy.getRandomStudyInterval).toHaveBeenCalledTimes(1);

    tick(5000);
    expect(trialServiceSpy.getRandomStudyInterval).toHaveBeenCalledTimes(2);

    tick(5000);
    expect(trialServiceSpy.getRandomStudyInterval).toHaveBeenCalledTimes(3);
  }));
});
