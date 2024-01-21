import {Injectable} from '@angular/core';
import {Province} from '../entities/province';
import {HttpClient} from '@angular/common/http';
import {ApiManager} from '../shared/api-manager';

@Injectable({
  providedIn: 'root'
})
export class ProvinceService {

  constructor(private http: HttpClient) { }

  async getAll(): Promise<Province[]>{
    const provinces = await this.http.get<Province[]>(ApiManager.getURL('provinces')).toPromise();
    return provinces.map((province) => Object.assign(new Province(), province));
  }

}
