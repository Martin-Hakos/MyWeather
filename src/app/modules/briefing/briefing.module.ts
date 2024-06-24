import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputFormComponent } from './components/input-form/input-form.component';
import { materialComponents } from '../material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BriefingTableComponent } from './components/briefing-table/briefing-table.component';
import { HighlightPipe } from './pipes/text-highlight.pipe';

@NgModule({
  declarations: [InputFormComponent, BriefingTableComponent, HighlightPipe],
  imports: [CommonModule, materialComponents, FormsModule, ReactiveFormsModule],
  exports: [InputFormComponent, BriefingTableComponent],
})
export class BriefingModule {}
