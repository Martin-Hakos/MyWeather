import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IBriefingData } from '../interfaces/briefing-data';

@Injectable({
  providedIn: 'root',
})
export class BriefingDataService {
  private api_url = 'https://ogcie.iblsoft.com/ria/opmetquery';

  constructor(private http: HttpClient) {}

  getBriefingData(
    reportTypes: string[],
    airports: string[],
    countries: string[]
  ): Observable<IBriefingData> {
    const body = {
      id: 'query01',
      method: 'query',
      params: [
        {
          id: 'briefing01',
          reportTypes: reportTypes,
          stations: airports,
          countries: countries,
        },
      ],
    };
    return this.http.post<IBriefingData>(`${this.api_url}`, body);
  }
}
