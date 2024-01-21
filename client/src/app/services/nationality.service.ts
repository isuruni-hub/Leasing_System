import {Injectable} from '@angular/core';
import {Nationality} from '../entities/nationality';
import {HttpClient} from '@angular/common/http';
import {ApiManager} from '../shared/api-manager';

@Injectable({
  providedIn: 'root'
})
export class NationalityService {

  constructor(private http: HttpClient) { }

  async getAll(): Promise<Nationality[]>{
    const nationalities = await this.http.get<Nationality[]>(ApiManager.getURL('nationalities')).toPromise();
    return nationalities.map((nationality) => Object.assign(new Nationality(), nationality));
  }

}
