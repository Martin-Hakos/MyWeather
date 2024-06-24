import { NgModule } from '@angular/core';
import {
  BrowserModule,
  provideClientHydration,
} from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { registerLocaleData } from '@angular/common';
import localeSk from '@angular/common/locales/sk';
import { LOCALE_ID } from '@angular/core';

// Angular Material Components
import { materialComponents } from './modules/material/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { BriefingModule } from './modules/briefing/briefing.module';
import { HeaderModule } from './modules/header/header.module';
import { provideHttpClient } from '@angular/common/http';

// NgRx Store
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { briefingReducer } from './store/reducers/briefing.reducer';
import { BriefingEffects } from './store/effects/briefing.effects';

registerLocaleData(localeSk);

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    materialComponents,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    BriefingModule,
    HeaderModule,
    StoreModule.forRoot({ briefing: briefingReducer }),
    EffectsModule.forRoot([BriefingEffects]),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
    }),
  ],
  providers: [
    provideClientHydration(),
    provideHttpClient(),
    { provide: LOCALE_ID, useValue: 'sk-SK' },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
