import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ApiManager} from '../shared/api-manager';
import {Valuationstatus} from '../entities/valuationstatus';

@Injectable({
  providedIn: 'root'
})
export class ValuationstatusService {

  constructor(private http: HttpClient) { }

  async getAll(): Promise<Valuationstatus[]>{
    const valuationstatuses = await this.http.get<Valuationstatus[]>(ApiManager.getURL('valuationstatuses')).toPromise();
    return valuationstatuses.map((valuationstatus) => Object.assign(new Valuationstatus(), valuationstatus));
  }

}
