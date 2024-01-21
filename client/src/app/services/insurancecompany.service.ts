import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ApiManager} from '../shared/api-manager';
import {PageRequest} from '../shared/page-request';
import {ResourceLink} from '../shared/resource-link';
import {Insurancecompany, InsurancecompanyDataPage} from '../entities/insurancecompany';

@Injectable({
  providedIn: 'root'
})
export class InsurancecompanyService {

  constructor(private http: HttpClient) { }

  async getAll(pageRequest: PageRequest): Promise<InsurancecompanyDataPage>{
    const url = pageRequest.getPageRequestURL('insurancecompanies');
    const insurancecompanyDataPage = await this.http.get<InsurancecompanyDataPage>(ApiManager.getURL(url)).toPromise();
    insurancecompanyDataPage.content = insurancecompanyDataPage.content.map((insurancecompany) => Object.assign(new Insurancecompany(), insurancecompany));
    return insurancecompanyDataPage;
  }

  async getAllBasic(pageRequest: PageRequest): Promise<InsurancecompanyDataPage>{
    const url = pageRequest.getPageRequestURL('insurancecompanies/basic');
    const insurancecompanyDataPage = await this.http.get<InsurancecompanyDataPage>(ApiManager.getURL(url)).toPromise();
    insurancecompanyDataPage.content = insurancecompanyDataPage.content.map((insurancecompany) => Object.assign(new Insurancecompany(), insurancecompany));
    return insurancecompanyDataPage;
  }

  async get(id: number): Promise<Insurancecompany>{
    const insurancecompany: Insurancecompany = await this.http.get<Insurancecompany>(ApiManager.getURL(`insurancecompanies/${id}`)).toPromise();
    return Object.assign(new Insurancecompany(), insurancecompany);
  }

  async delete(id: number): Promise<void>{
    return this.http.delete<void>(ApiManager.getURL(`insurancecompanies/${id}`)).toPromise();
  }

  async add(insurancecompany: Insurancecompany): Promise<ResourceLink>{
    return this.http.post<ResourceLink>(ApiManager.getURL(`insurancecompanies`), insurancecompany).toPromise();
  }

  async update(id: number, insurancecompany: Insurancecompany): Promise<ResourceLink>{
    return this.http.put<ResourceLink>(ApiManager.getURL(`insurancecompanies/${id}`), insurancecompany).toPromise();
  }


}
