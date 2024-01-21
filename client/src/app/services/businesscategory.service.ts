import {Injectable} from '@angular/core';
import {Businesscategory} from '../entities/businesscategory';
import {HttpClient} from '@angular/common/http';
import {ApiManager} from '../shared/api-manager';

@Injectable({
  providedIn: 'root'
})
export class BusinesscategoryService {

  constructor(private http: HttpClient) { }

  async getAll(): Promise<Businesscategory[]>{
    const businesscategories = await this.http.get<Businesscategory[]>(ApiManager.getURL('businesscategories')).toPromise();
    return businesscategories.map((businesscategory) => Object.assign(new Businesscategory(), businesscategory));
  }

}
