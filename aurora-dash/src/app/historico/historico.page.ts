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

    this.createBarChart(data, hoursDesc.sort());
  }

  //https://enappd.com/blog/ionic-4-charts-using-google-charts/66/
  //https://enappd.com/blog/charts-in-ionic-4-apps-and-pwa-part-1/52/
  createBarChart(data: Array<IReportSummary>, hoursDesc: Array<string>) {
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
