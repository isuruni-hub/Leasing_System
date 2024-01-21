import { Component, OnInit } from '@angular/core';
import {ReportService} from '../../../../services/report.service';
import {AbstractComponent} from '../../../../shared/abstract-component';
import {ChartDataSets, ChartOptions} from 'chart.js';
import {Color, Label} from 'ng2-charts';

@Component({
  selector: 'app-year-wise-vehicle-count',
  templateUrl: './year-wise-vehicle-count.component.html',
  styleUrls: ['./year-wise-vehicle-count.component.scss']
})
export class YearWiseVehicleCountComponent extends AbstractComponent implements OnInit {

  yearWiseData: any[];

  public lineChartData: ChartDataSets[] = [
    { data: [], label: 'Count ' },
  ];
  public lineChartLabels: Label[] = [];
  public lineChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
  };
  public lineChartColors: Color[] = [
    {
      borderColor: 'black',
      backgroundColor: 'rgba(255,255,0,0.3)',
    },
  ];
  public lineChartLegend = true;
  public lineChartType = 'bar';
  public lineChartPlugins = [];


  constructor(private reportServive: ReportService) {
    super();
  }

  async ngOnInit(): Promise<void> {
    await this.loadData();
    this.refreshData();
  }

  async loadData(): Promise<any> {
    this.yearWiseData =await this.reportServive.getYearWiseVehicleCount(10);
    this.lineChartLabels = [];
    this.lineChartData[0].data = [];
    for (const yearData of this.yearWiseData){
      this.lineChartLabels.push(yearData.year);
      this.lineChartData[0].data.push(yearData.count);

    }
  }

  updatePrivileges(): any {}

}
