import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ApiManager} from '../shared/api-manager';
import {Insurancecompanystatus} from '../entities/insurancecompanystatus';

@Injectable({
  providedIn: 'root'
})
export class InsurancecompanystatusService {

  constructor(private http: HttpClient) { }

  async getAll(): Promise<Insurancecompanystatus[]>{
    const insurancecompanystatuses = await this.http.get<Insurancecompanystatus[]>(ApiManager.getURL('insurancecompanystatuses')).toPromise();
    return insurancecompanystatuses.map((insurancecompanystatus) => Object.assign(new Insurancecompanystatus(), insurancecompanystatus));
  }

}
