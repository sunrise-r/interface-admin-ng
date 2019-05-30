import {IadPresentation} from '../../model/iad-model';
import {IadProjectionInterface} from '../../model/iad-interfaces';
import {IadFormProjectionInterface} from 'iad-interface-admin/form';

export enum PROJECTION_TYPE {
  LIST = 'list',
  LOOKUP = 'lookup',
  VIEW = 'view',
  REFERENCE = 'reference',
  FORM = 'form'
}

// @dynamic
export class ProjectionsHelper {
  static filterProjections(model: IadPresentation, type: PROJECTION_TYPE): IadProjectionInterface[] {
    const excludes = Object.keys(PROJECTION_TYPE)
      .map(k => PROJECTION_TYPE[k as any])
      .filter(exp => exp !== type);

    return model.projections.filter(projection => excludes.indexOf(projection.code) === -1);
  }

  static filterFormProjections(model: IadPresentation, type: PROJECTION_TYPE): IadFormProjectionInterface[] {
    const excludes = Object.keys(PROJECTION_TYPE)
      .map(k => PROJECTION_TYPE[k as any])
      .filter(exp => exp !== type);

    return model.formProjections.filter(projection => excludes.indexOf(projection.code) === -1);
  }
}
