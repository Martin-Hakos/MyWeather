export interface IBriefingData {
  error: IError;
  id: string;
  result: IResult[];
}

export interface IError {
  code: number;
  data: any | null;
  message: string;
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

export interface IGroupedResult {
  [stationId: string]: IResult[];
}
