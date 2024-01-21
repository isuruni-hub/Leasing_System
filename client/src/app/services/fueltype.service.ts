import {Injectable} from '@angular/core';
import {Fueltype} from '../entities/fueltype';
import {HttpClient} from '@angular/common/http';
import {ApiManager} from '../shared/api-manager';

@Injectable({
  providedIn: 'root'
})
export class FueltypeService {

  constructor(private http: HttpClient) { }

  async getAll(): Promise<Fueltype[]>{
    const fueltypes = await this.http.get<Fueltype[]>(ApiManager.getURL('fueltypes')).toPromise();
    return fueltypes.map((fueltype) => Object.assign(new Fueltype(), fueltype));
  }

}
