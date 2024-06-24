export interface IBriefingData {
  error: IError;
  id: string;
  result: string;
}

export interface IError {
  code: number;
  data: any | null;
  message: IResult[];
}

export interface IResult {
  placeId: string;
  queryType: string;
  receptionTime: string;
  refs: string[];
  reportTime: string;
  reportType: string;
  revision: string;
  stationId: string;
  text: string;
  textHTML: string;
}

export interface IRequestQuery {
  id: string;
  method: string;
  params: [
    {
      id: string;
      reportTypes: string[];
      stations: string[];
      countries: string[];
    }
  ];
}
