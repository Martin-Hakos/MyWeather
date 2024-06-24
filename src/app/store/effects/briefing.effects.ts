import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import * as BriefingActions from '../actions/briefing.actions';
import { BriefingDataService } from '../../modules/briefing/services/briefing-data.service';

@Injectable()
export class BriefingEffects {
  constructor(
    private actions$: Actions,
    private briefing_data_service: BriefingDataService
  ) {}

  loadBriefingData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BriefingActions.loadBriefingData),
      mergeMap((action) =>
        this.briefing_data_service
          .getBriefingData(
            action.reportTypes,
            action.airports,
            action.countries
          )
          .pipe(
            map((data) => BriefingActions.loadBriefingDataSuccess({ data })),
            catchError((error) =>
              of(BriefingActions.loadBriefingDataFailure({ error }))
            )
          )
      )
    )
  );
}
