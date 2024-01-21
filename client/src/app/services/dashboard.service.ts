import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ApiManager} from '../shared/api-manager';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private http: HttpClient) { }

  async getRecentCustomerCount(): Promise<number>{
    const data = await this.http.get<any>(ApiManager.getURL('dashboard/recent-customer-count')).toPromise();
    return data.count;
  }

}
