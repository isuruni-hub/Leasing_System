import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ApiManager} from '../shared/api-manager';
import {PageRequest} from '../shared/page-request';
import {ResourceLink} from '../shared/resource-link';
import {Offer, OfferDataPage} from '../entities/offer';

@Injectable({
  providedIn: 'root'
})
export class OfferService {

  constructor(private http: HttpClient) { }

  async getAll(pageRequest: PageRequest): Promise<OfferDataPage>{
    const url = pageRequest.getPageRequestURL('offers');
    const offerDataPage = await this.http.get<OfferDataPage>(ApiManager.getURL(url)).toPromise();
    offerDataPage.content = offerDataPage.content.map((offer) => Object.assign(new Offer(), offer));
    return offerDataPage;
  }

  async getAllBasic(pageRequest: PageRequest): Promise<OfferDataPage>{
    const url = pageRequest.getPageRequestURL('offers/basic');
    const offerDataPage = await this.http.get<OfferDataPage>(ApiManager.getURL(url)).toPromise();
    offerDataPage.content = offerDataPage.content.map((offer) => Object.assign(new Offer(), offer));
    return offerDataPage;
  }

  async get(id: number): Promise<Offer>{
    const offer: Offer = await this.http.get<Offer>(ApiManager.getURL(`offers/${id}`)).toPromise();
    return Object.assign(new Offer(), offer);
  }

  async delete(id: number): Promise<void>{
    return this.http.delete<void>(ApiManager.getURL(`offers/${id}`)).toPromise();
  }

  async add(offer: Offer): Promise<ResourceLink>{
    return this.http.post<ResourceLink>(ApiManager.getURL(`offers`), offer).toPromise();
  }

  async update(id: number, offer: Offer): Promise<ResourceLink>{
    return this.http.put<ResourceLink>(ApiManager.getURL(`offers/${id}`), offer).toPromise();
  }


}
