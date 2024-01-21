import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Nametitle} from '../entities/nametitle';
import {ApiManager} from '../shared/api-manager';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  constructor(private http: HttpClient) {
  }

  async getYearWiseVehicleCount(count: number): Promise<any[]> {
    const url = ApiManager.getURL('reports/year-wise-vehicle-count/' + count);
    return await this.http.get<any[]>(url).toPromise();
  }
}
