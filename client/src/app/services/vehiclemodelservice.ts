import {Injectable} from '@angular/core';
import {Vehiclemodel} from '../entities/vehiclemodel';
import {HttpClient} from '@angular/common/http';
import {ApiManager} from '../shared/api-manager';

@Injectable({
  providedIn: 'root'
})
export class VehiclemodelService {

  constructor(private http: HttpClient) { }

  async getAll(): Promise<Vehiclemodel[]>{
    const vehiclemodels = await this.http.get<Vehiclemodel[]>(ApiManager.getURL('vehiclemodels')).toPromise();
    return vehiclemodels.map((vehiclemodel) => Object.assign(new Vehiclemodel(), vehiclemodel));
  }

}
