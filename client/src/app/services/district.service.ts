import {Injectable} from '@angular/core';
import {District} from '../entities/district';
import {HttpClient} from '@angular/common/http';
import {ApiManager} from '../shared/api-manager';

@Injectable({
  providedIn: 'root'
})
export class DistrictService {

  constructor(private http: HttpClient) { }

  async getAll(): Promise<District[]>{
    const districts = await this.http.get<District[]>(ApiManager.getURL('districts')).toPromise();
    return districts.map((district) => Object.assign(new District(), district));
  }

}
