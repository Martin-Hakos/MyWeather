import { createReducer, on } from '@ngrx/store';
import * as BriefingActions from '../actions/briefing.actions';
import { IBriefingData } from '../../modules/briefing/interfaces/briefing-data';

export interface BriefingState {
  loading: boolean;
  briefingData: IBriefingData | null;
  error: any | null;
}

export const initialState: BriefingState = {
  loading: false,
  briefingData: null,
  error: null,
};

export const briefingReducer = createReducer(
  initialState,
  on(BriefingActions.loadBriefingData, (state) => ({
    ...state,
    loading: true,
  })),
  on(BriefingActions.loadBriefingDataSuccess, (state, { data }) => ({
    ...state,
    briefingData: data,
    error: null,
    loading: false,
  })),
  on(BriefingActions.loadBriefingDataFailure, (state, { error }) => ({
    ...state,
    briefingData: null,
    error,
    loading: false,
  }))
);
