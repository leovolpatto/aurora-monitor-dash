import { Component, ViewChild } from '@angular/core';
import { Chart } from 'chart.js';
import { ReportService, IReportSummary } from '../services/report.service';

@Component({
  selector: 'app-historico',
  templateUrl: 'historico.page.html',
  styleUrls: ['historico.page.scss']
})
export class HistoricoPage {

  @ViewChild('barChart', {
    static: false
  }) barChart;

  @ViewChild('timeSeriesChart', {
    static: false
  }) timeSeriesChart;

  bars: any;
  colorArray: any;
  constructor(private reportService: ReportService) { }

  ionViewDidEnter() {
    this.loadSummaryDate();
  }

  private async loadSummaryDate() {
    const data = await this.reportService.getSummary();

    let hours: Array<number> = [];
    let hoursDesc: Array<string> = [];
    data.forEach(d => {
      const hour = d.hour;
      if (hours.indexOf(hour) < 0) {
        hours[hour] = hour;
        hoursDesc.push(`${hour}:00 - ${hour}:59`);
      }
    });

    this.createTimeSeriesChart(data);
    this.createBarChart(data, hoursDesc.sort());
  }
  
  private createEmptyDataset() : any{
    return {
      label: '',
      data: [0],
      backgroundColor: 'rgb(204, 0, 0)', // array should have same number of elements as number of dataset
      borderColor: 'rgb(204, 0, 0)',// array should have same number of elements as number of dataset
      borderWidth: 1
    }    
  }

  private createDataset(value: number, hour: number, minute: number, label: string = 'Em alarme') : any{
    return {
      data: [value, '2020-03-18 07:00:00'],
      backgroundColor: 'rgb(204, 0, 0)', // array should have same number of elements as number of dataset
      borderColor: 'rgb(204, 0, 0)',// array should have same number of elements as number of dataset
      borderWidth: 1
    }    
  }

  private getBarData(data) {
    return {
      labels: ['Em alarme', ''],
      datasets: [
        this.createEmptyDataset(),
        this.createDataset(4, 7, 0),   
      ]};
  }

  private getBarChartData() : any{
    return {
      labels: ['7:00', '8:00', '9:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00'],
      datasets: [
        {
        label: 'Em alarme',
        backgroundColor: 'rgb(255, 0, 0)',
        borderWidth: 1,
        data: [
          35,
          10,
          2,
          3,
          5,
          0, 
          11,
          1,
          12,
          3,
          0,
          2,
          5,
          7
        ]
      }
    ]
  }}

  private createTimeSeriesChart(data) {
    this.bars = new Chart(this.timeSeriesChart.nativeElement, {
      type: 'bar',
      data: this.getBarChartData(),
      options: {
        responsive: true,
        legend: {
          position: 'top',
        },
        title: {
          display: true,
          text: 'Maquina parada por alarme (minutos por hora)'
        }
      }
    });
  }

  //https://enappd.com/blog/ionic-4-charts-using-google-charts/66/
  //https://enappd.com/blog/charts-in-ionic-4-apps-and-pwa-part-1/52/
  private createBarChart(data: Array<IReportSummary>, hoursDesc: Array<string>) {
    this.bars = new Chart(this.barChart.nativeElement, {
      type: 'bar',
      data: {
        labels: hoursDesc,
        datasets: [
          {
            label: 'Produção (16)',
            data: data.filter(p => p.pin == 16).map(d => d.qnty),//qntys
            backgroundColor: 'rgb(0, 102, 204)', // array should have same number of elements as number of dataset
            borderColor: 'rgb(0, 102, 204)',// array should have same number of elements as number of dataset
            borderWidth: 1
          },
          {
            label: 'Em marcha (4)',
            data: data.filter(p => p.pin == 4).map(d => d.qnty),
            backgroundColor: 'rgb(0, 153, 0)', // array should have same number of elements as number of dataset
            borderColor: 'rgb(0, 153, 0)',// array should have same number of elements as number of dataset
            borderWidth: 1
          },
          {
            label: 'Em alarme (14)',
            data: data.filter(p => p.pin == 14).map(d => d.qnty),
            backgroundColor: 'rgb(204, 0, 0)', // array should have same number of elements as number of dataset
            borderColor: 'rgb(204, 0, 0)',// array should have same number of elements as number of dataset
            borderWidth: 1
          },
          {
            label: 'Girando (12)',
            data: data.filter(p => p.pin == 12).map(d => d.qnty),
            backgroundColor: 'rgb(64, 64, 64)', // array should have same number of elements as number of dataset
            borderColor: 'rgb(64, 64, 64)',// array should have same number of elements as number of dataset
            borderWidth: 1
          }
        ]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    });
  }
}
