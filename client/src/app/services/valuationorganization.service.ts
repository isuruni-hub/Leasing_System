import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ApiManager} from '../shared/api-manager';
import {PageRequest} from '../shared/page-request';
import {ResourceLink} from '../shared/resource-link';
import {Valuationorganization, ValuationorganizationDataPage} from '../entities/valuationorganization';

@Injectable({
  providedIn: 'root'
})
export class ValuationorganizationService {

  constructor(private http: HttpClient) { }

  async getAll(pageRequest: PageRequest): Promise<ValuationorganizationDataPage>{
    const url = pageRequest.getPageRequestURL('valuationorganizations');
    const valuationorganizationDataPage = await this.http.get<ValuationorganizationDataPage>(ApiManager.getURL(url)).toPromise();
    valuationorganizationDataPage.content = valuationorganizationDataPage.content.map((valuationorganization) => Object.assign(new Valuationorganization(), valuationorganization));
    return valuationorganizationDataPage;
  }

  async getAllBasic(pageRequest: PageRequest): Promise<ValuationorganizationDataPage>{
    const url = pageRequest.getPageRequestURL('valuationorganizations/basic');
    const valuationorganizationDataPage = await this.http.get<ValuationorganizationDataPage>(ApiManager.getURL(url)).toPromise();
    valuationorganizationDataPage.content = valuationorganizationDataPage.content.map((valuationorganization) => Object.assign(new Valuationorganization(), valuationorganization));
    return valuationorganizationDataPage;
  }

  async get(id: number): Promise<Valuationorganization>{
    const valuationorganization: Valuationorganization = await this.http.get<Valuationorganization>(ApiManager.getURL(`valuationorganizations/${id}`)).toPromise();
    return Object.assign(new Valuationorganization(), valuationorganization);
  }

  async delete(id: number): Promise<void>{
    return this.http.delete<void>(ApiManager.getURL(`valuationorganizations/${id}`)).toPromise();
  }

  async add(valuationorganization: Valuationorganization): Promise<ResourceLink>{
    return this.http.post<ResourceLink>(ApiManager.getURL(`valuationorganizations`), valuationorganization).toPromise();
  }

  async update(id: number, valuationorganization: Valuationorganization): Promise<ResourceLink>{
    return this.http.put<ResourceLink>(ApiManager.getURL(`valuationorganizations/${id}`), valuationorganization).toPromise();
  }


}
