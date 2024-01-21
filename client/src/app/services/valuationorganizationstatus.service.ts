import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ApiManager} from '../shared/api-manager';
import {Valuationorganizationstatus} from '../entities/valuationorganizationstatus';

@Injectable({
  providedIn: 'root'
})
export class ValuationorganizationstatusService {

  constructor(private http: HttpClient) { }

  async getAll(): Promise<Valuationorganizationstatus[]>{
    const valuationorganizationstatuses = await this.http.get<Valuationorganizationstatus[]>(ApiManager.getURL('valuationorganizationstatuses')).toPromise();
    return valuationorganizationstatuses.map((valuationorganizationstatus) => Object.assign(new Valuationorganizationstatus(), valuationorganizationstatus));
  }

}
