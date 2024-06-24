import { createAction, props } from '@ngrx/store';
import { IBriefingData } from '../../modules/briefing/interfaces/briefing-data';

export const loadBriefingData = createAction(
  '[Briefing] Load Briefing Data',
  props<{ reportTypes: string[]; airports: string[]; countries: string[] }>()
);
export const loadBriefingDataSuccess = createAction(
  '[Briefing] Load Briefing Data Success',
  props<{ data: IBriefingData }>()
);
export const loadBriefingDataFailure = createAction(
  '[Briefing] Load Briefing Data Failure',
  props<{ error: any }>()
);
