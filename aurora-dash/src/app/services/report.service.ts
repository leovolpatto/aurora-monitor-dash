import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface IReportSummary{
  date: Date,
  hour: number;
  pin: number;
  qnty: number;
}

@Injectable()
export class ReportService {

  //http://127.0.0.1:4446/summary/minute?pin=16&fromDate=2020-03-16&toDate=2020-03-18
  private API_URL = 'http://aurora.leptons.io:82/';//minute?pin=16&fromDate=2020-03-16&toDate=2020-03-18'
 
  constructor(public http: HttpClient) { }
  
  getSummary() : Promise<Array<IReportSummary>>{
    return new Promise((resolve, reject) => {
 
      let url = this.API_URL + 'summary';
 
      //{dia: "2020-03-11T03:00:00.000Z", hora: 20, pin: 12, quantidade: "1"}
      this.http.get(url)
        .subscribe((result: Array<any>) => {
          const data = result.map(m => {
            let x: IReportSummary;
            x = {
              date: new Date(m.dia),
              hour: Number.parseInt(m.hora),
              pin: Number.parseInt(m.pin),
              qnty: Number.parseInt(m.quantidade)
            };
            return x;
          });
          resolve(data);
        },
        (error) => {
          console.error(error);
          reject(error);
        });
    });
  }
}
