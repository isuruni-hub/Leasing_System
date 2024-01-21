import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ApiManager} from '../shared/api-manager';
import {PageRequest} from '../shared/page-request';
import {ResourceLink} from '../shared/resource-link';
import {Valuation, ValuationDataPage} from '../entities/valuation';

@Injectable({
  providedIn: 'root'
})
export class ValuationService {

  constructor(private http: HttpClient) { }

  async getAll(pageRequest: PageRequest): Promise<ValuationDataPage>{
    const url = pageRequest.getPageRequestURL('valuations');
    const valuationDataPage = await this.http.get<ValuationDataPage>(ApiManager.getURL(url)).toPromise();
    valuationDataPage.content = valuationDataPage.content.map((valuation) => Object.assign(new Valuation(), valuation));
    return valuationDataPage;
  }

  async getAllBasic(pageRequest: PageRequest): Promise<ValuationDataPage>{
    const url = pageRequest.getPageRequestURL('valuations/basic');
    const valuationDataPage = await this.http.get<ValuationDataPage>(ApiManager.getURL(url)).toPromise();
    valuationDataPage.content = valuationDataPage.content.map((valuation) => Object.assign(new Valuation(), valuation));
    return valuationDataPage;
  }

  async get(id: number): Promise<Valuation>{
    const valuation: Valuation = await this.http.get<Valuation>(ApiManager.getURL(`valuations/${id}`)).toPromise();
    return Object.assign(new Valuation(), valuation);
  }

  async delete(id: number): Promise<void>{
    return this.http.delete<void>(ApiManager.getURL(`valuations/${id}`)).toPromise();
  }

  async add(valuation: Valuation): Promise<ResourceLink>{
    return this.http.post<ResourceLink>(ApiManager.getURL(`valuations`), valuation).toPromise();
  }

  async update(id: number, valuation: Valuation): Promise<ResourceLink>{
    return this.http.put<ResourceLink>(ApiManager.getURL(`valuations/${id}`), valuation).toPromise();
  }

}
