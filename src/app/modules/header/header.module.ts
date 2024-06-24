import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { materialComponents } from '../material/material.module';

@NgModule({
  declarations: [HeaderComponent],
  imports: [CommonModule, materialComponents],
  exports: [HeaderComponent],
})
export class HeaderModule {}
