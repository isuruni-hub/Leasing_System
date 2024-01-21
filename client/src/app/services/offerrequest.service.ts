import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ApiManager} from '../shared/api-manager';
import {PageRequest} from '../shared/page-request';
import {ResourceLink} from '../shared/resource-link';
import {Offerrequest, OfferrequestDataPage} from '../entities/offerrequest';

@Injectable({
  providedIn: 'root'
})
export class OfferrequestService {

  constructor(private http: HttpClient) { }

  async getAll(pageRequest: PageRequest): Promise<OfferrequestDataPage>{
    const url = pageRequest.getPageRequestURL('offerrequests');
    const offerrequestDataPage = await this.http.get<OfferrequestDataPage>(ApiManager.getURL(url)).toPromise();
    offerrequestDataPage.content = offerrequestDataPage.content.map((offerrequest) => Object.assign(new Offerrequest(), offerrequest));
    return offerrequestDataPage;
  }

  async getAllBasic(pageRequest: PageRequest): Promise<OfferrequestDataPage>{
    const url = pageRequest.getPageRequestURL('offerrequests/basic');
    const offerrequestDataPage = await this.http.get<OfferrequestDataPage>(ApiManager.getURL(url)).toPromise();
    offerrequestDataPage.content = offerrequestDataPage.content.map((offerrequest) => Object.assign(new Offerrequest(), offerrequest));
    return offerrequestDataPage;
  }

  async get(id: number): Promise<Offerrequest>{
    const offerrequest: Offerrequest = await this.http.get<Offerrequest>(ApiManager.getURL(`offerrequests/${id}`)).toPromise();
    return Object.assign(new Offerrequest(), offerrequest);
  }

  async delete(id: number): Promise<void>{
    return this.http.delete<void>(ApiManager.getURL(`offerrequests/${id}`)).toPromise();
  }

  async add(offerrequest: Offerrequest): Promise<ResourceLink>{
    return this.http.post<ResourceLink>(ApiManager.getURL(`offerrequests`), offerrequest).toPromise();
  }

  async update(id: number, offerrequest: Offerrequest): Promise<ResourceLink>{
    return this.http.put<ResourceLink>(ApiManager.getURL(`offerrequests/${id}`), offerrequest).toPromise();
  }

}
