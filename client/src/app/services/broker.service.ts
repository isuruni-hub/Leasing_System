import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ApiManager} from '../shared/api-manager';
import {PageRequest} from '../shared/page-request';
import {ResourceLink} from '../shared/resource-link';
import {Broker, BrokerDataPage} from '../entities/broker';

@Injectable({
  providedIn: 'root'
})
export class BrokerService {

  constructor(private http: HttpClient) { }

  async getAll(pageRequest: PageRequest): Promise<BrokerDataPage>{
    const url = pageRequest.getPageRequestURL('brokers');
    const brokerDataPage = await this.http.get<BrokerDataPage>(ApiManager.getURL(url)).toPromise();
    brokerDataPage.content = brokerDataPage.content.map((broker) => Object.assign(new Broker(), broker));
    return brokerDataPage;
  }

  async getAllBasic(pageRequest: PageRequest): Promise<BrokerDataPage>{
    const url = pageRequest.getPageRequestURL('brokers/basic');
    const brokerDataPage = await this.http.get<BrokerDataPage>(ApiManager.getURL(url)).toPromise();
    brokerDataPage.content = brokerDataPage.content.map((broker) => Object.assign(new Broker(), broker));
    return brokerDataPage;
  }

  async get(id: number): Promise<Broker>{
    const broker: Broker = await this.http.get<Broker>(ApiManager.getURL(`brokers/${id}`)).toPromise();
    return Object.assign(new Broker(), broker);
  }

  async delete(id: number): Promise<void>{
    return this.http.delete<void>(ApiManager.getURL(`brokers/${id}`)).toPromise();
  }

  async add(broker: Broker): Promise<ResourceLink>{
    return this.http.post<ResourceLink>(ApiManager.getURL(`brokers`), broker).toPromise();
  }

  async update(id: number, broker: Broker): Promise<ResourceLink>{
    return this.http.put<ResourceLink>(ApiManager.getURL(`brokers/${id}`), broker).toPromise();
  }


}
