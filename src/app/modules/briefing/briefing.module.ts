import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputFormComponent } from './components/input-form/input-form.component';
import { materialComponents } from '../material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BriefingDataService } from './services/briefing-data.service';

@NgModule({
  declarations: [InputFormComponent],
  imports: [CommonModule, materialComponents, FormsModule, ReactiveFormsModule],
  exports: [InputFormComponent],
  providers: [BriefingDataService],
})
export class BriefingModule {}
