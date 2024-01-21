import {Injectable} from '@angular/core';
import {Country} from '../entities/country';
import {HttpClient} from '@angular/common/http';
import {ApiManager} from '../shared/api-manager';

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  constructor(private http: HttpClient) { }

  async getAll(): Promise<Country[]>{
    const countries = await this.http.get<Country[]>(ApiManager.getURL('countries')).toPromise();
    return countries.map((country) => Object.assign(new Country(), country));
  }

}
