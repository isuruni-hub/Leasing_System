import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ApiManager} from '../shared/api-manager';
import {Vehiclecondition} from '../entities/vehiclecondition';

@Injectable({
  providedIn: 'root'
})
export class VehicleconditionService {

  constructor(private http: HttpClient) { }

  async getAll(): Promise<Vehiclecondition[]>{
    const vehicleconditions = await this.http.get<Vehiclecondition[]>(ApiManager.getURL('vehicleconditions')).toPromise();
    return vehicleconditions.map((vehiclecondition) => Object.assign(new Vehiclecondition(), vehiclecondition));
  }

}
