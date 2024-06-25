import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  AbstractControlOptions,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import { IBriefingData } from '../../interfaces/briefing-data';
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
  airports = new FormControl(['']);
  countries = new FormControl(['']);

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
        metar: [false],
        sigmet: [false],
        taf: [false],
        airports: [''],
        countries: [''],
      },
      {
        validators: [this.checkboxSelected, this.inputHasValue],
      } as AbstractControlOptions
    );
  }

  checkboxSelected = (control: AbstractControl): ValidationErrors | null => {
    const formGroup = control as FormGroup;
    const isChecked = this.reportTypes.some(
      (key) => formGroup.controls[key].value
    );
    return isChecked ? null : { atLeastOneCheckboxSelected: true };
  };

  inputHasValue = (control: AbstractControl): ValidationErrors | null => {
    const formGroup = control as FormGroup;
    const inputs = ['airports', 'countries'];
    const hasValue = inputs.some(
      (key) =>
        formGroup.controls[key].value || formGroup.controls[key].value !== ''
    );
    return hasValue ? null : { atLeastOneInputHasValue: true };
  };

  formatValue(event: any, charId: number, formControlName: string) {
    let value = event.target.value.toUpperCase();
    console.log(event.target.value);
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
    const airportsValue = this.briefingForm.get('airports')?.value[0];
    const countriesValue = this.briefingForm.get('countries')?.value[0];

    this.selectedAirports = airportsValue
      ? airportsValue.split(' ').filter((val: string) => val !== '')
      : [];
    this.selectedCountries = countriesValue
      ? countriesValue.split(' ').filter((val: string) => val !== '')
      : [];

    const formValue = this.briefingForm.value;
    this.selectedReportTypes = this.reportTypes.filter(
      (value) => formValue[value]
    );
    this.selectedReportTypes = this.selectedReportTypes.map((value) =>
      value.toUpperCase()
    );

    console.log(this.selectedAirports);
    console.log(this.selectedCountries);

    this.store.dispatch(
      briefingActions.loadBriefingData({
        reportTypes: this.selectedReportTypes,
        airports: this.selectedAirports,
        countries: this.selectedCountries,
      })
    );
  }
}
