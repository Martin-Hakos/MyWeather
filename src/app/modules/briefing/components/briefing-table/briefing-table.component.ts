import { Component, OnDestroy, OnInit } from '@angular/core';
import { IBriefingData, IGroupedResult } from '../../interfaces/briefing-data';
import { Observable, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { IAppState } from '../../../../store/types/appState.interface';
import {
  briefingSelector,
  errorSelector,
  isLoadingSelector,
} from '../../../../store/selectors/briefing.selector';

@Component({
  selector: 'app-briefing-table',
  templateUrl: './briefing-table.component.html',
  styleUrl: './briefing-table.component.scss',
})
export class BriefingTableComponent implements OnInit, OnDestroy {
  isLoading$: Observable<boolean>;
  briefingData$: Observable<IBriefingData | null>;
  error$: Observable<string | null>;

  briefingData!: IBriefingData;
  groupedBriefingData!: IGroupedResult;

  public isLoadingSub: Subscription = new Subscription();
  public briefingDataSub: Subscription = new Subscription();
  public errorSub: Subscription = new Subscription();

  constructor(private store: Store<IAppState>) {
    this.isLoading$ = this.store.select(isLoadingSelector);
    this.briefingData$ = this.store.select(briefingSelector);
    this.error$ = this.store.select(errorSelector);
  }

  ngOnInit(): void {
    this.getBriefingData();
    this.getErrorState();
  }

  ngOnDestroy(): void {
    this.isLoadingSub.unsubscribe();
    this.briefingDataSub.unsubscribe();
    this.errorSub.unsubscribe();
  }

  getBriefingData() {
    this.briefingDataSub = this.briefingData$.subscribe((data) => {
      if (data) {
        this.groupedBriefingData = this.groupByStationId(data);
      }
    });
  }

  getErrorState() {
    this.error$.subscribe((err) => {
      console.log(err);
    });
  }

  groupByStationId(data: IBriefingData): IGroupedResult {
    const groupedResult: IGroupedResult = {};

    if (data.result) {
      data.result.forEach((item) => {
        const stationId = item.stationId;
        if (!groupedResult[stationId]) {
          groupedResult[stationId] = [];
        }
        groupedResult[stationId].push(item);
      });
    }

    return groupedResult;
  }

  getStationIds(): string[] {
    return Object.keys(this.groupedBriefingData);
  }
}
