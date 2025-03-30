import { StudyModel } from '../models/study.model';
import { StudyDto } from '../dtos/study.dto';

export const fromStudyDtoToStudyModelMapper = (data: StudyDto): StudyModel => {
  return {
    id: data.protocolSection.identificationModule.nctId,
    title: data.protocolSection.identificationModule.briefTitle
  };
};
