import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { IBriefingData, IGroupedResult } from '../../interfaces/briefing-data';
import { Store } from '@ngrx/store';
import { IAppState } from '../../../../store/types/appState.interface';
import * as briefingActions from './../../../../store/actions/briefing.actions';

@Component({
  selector: 'app-input-form',
  templateUrl: './input-form.component.html',
  styleUrls: ['./input-form.component.scss'],
})
export class InputFormComponent implements OnInit {
  briefingForm!: FormGroup;
  metar = new FormControl(false);
  sigmet = new FormControl(false);
  taf = new FormControl(false);
  airports = new FormControl('');
  countries = new FormControl('');

  reportTypes: string[] = [];

  selectedAirports: string[] = [];
  selectedCountries: string[] = [];
  selectedReportTypes: string[] = [];

  briefingData!: IBriefingData;

  constructor(
    private formBuilder: FormBuilder,
    private store: Store<IAppState>
  ) {
    this.reportTypes = ['metar', 'sigmet', 'taf'];
  }

  ngOnInit(): void {
    this.briefingForm = this.formBuilder.group(
      {
        metar: this.metar,
        sigmet: this.sigmet,
        taf: this.taf,
        airports: this.airports,
        countries: this.countries,
      },
      {
        validators: [this.checkboxSelected, this.inputHasValue],
      }
    );
  }

  checkboxSelected = (group: FormGroup) => {
    const isChecked = this.reportTypes.some((key) => group.controls[key].value);
    return isChecked ? null : { atLeastOneCheckboxSelected: true };
  };

  inputHasValue = (group: FormGroup) => {
    const inputs = ['airports', 'countries'];
    const hasValue = inputs.some((key) => group.controls[key].value);
    return hasValue ? null : { atLeastOneInputHasValue: true };
  };

  formatValue(event: any, charId: number, formControlName: string) {
    let value = event.target.value.toUpperCase();
    value = value.replace(/\s+/g, '');

    if (event.data) {
      value += event.data;
    }

    const regex = new RegExp(`.{1,${charId}}`, 'g');
    let formattedValue = value.match(regex)?.join(' ') || '';

    this.briefingForm.get(`${formControlName}`)!.setValue([formattedValue], {
      emitEvent: false,
    });
  }

  loadBriefingData() {
    if (this.briefingForm.get('airports')!.value[0] !== undefined) {
      this.selectedAirports = this.briefingForm
        .get('airports')!
        .value[0].split(' ');
    }
    if (this.briefingForm.get('countries')!.value[0] !== undefined) {
      this.selectedCountries = this.briefingForm
        .get('countries')!
        .value[0].split(' ');
    }

    const formValue = this.briefingForm.value;
    this.selectedReportTypes = this.reportTypes.filter(
      (value) => formValue[value]
    );
    this.selectedReportTypes = this.selectedReportTypes.map((value) =>
      value.toUpperCase()
    );

    this.store.dispatch(
      briefingActions.loadBriefingData({
        reportTypes: this.selectedReportTypes,
        airports: this.selectedAirports,
        countries: this.selectedCountries,
      })
    );
  }
}
