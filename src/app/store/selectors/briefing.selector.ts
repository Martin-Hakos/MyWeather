import { createSelector } from '@ngrx/store';
import { IAppState } from '../types/appState.interface';

export const selectFeature = (state: IAppState) => state.briefing;

export const isLoadingSelector = createSelector(
  selectFeature,
  (state) => state.loading
);
export const briefingSelector = createSelector(
  selectFeature,
  (state) => state.briefingData
);
export const errorSelector = createSelector(
  selectFeature,
  (state) => state.error
);
