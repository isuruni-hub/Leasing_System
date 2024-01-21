import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ApiManager} from '../shared/api-manager';
import {Customertype} from '../entities/customertype';
import {Customersubtype} from '../entities/customersubtype';

@Injectable({
  providedIn: 'root'
})
export class CustomersubtypeService {

  constructor(private http: HttpClient) { }

  async getAll(): Promise<Customersubtype[]>{
    const customersubtypes = await this.http.get<Customersubtype[]>(ApiManager.getURL('customersubtypes')).toPromise();
    return customersubtypes.map((customersubtype) => Object.assign(new Customersubtype(), customersubtype));
  }

}
