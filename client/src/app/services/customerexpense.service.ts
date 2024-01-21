import {Injectable} from '@angular/core';

import {ApiManager} from '../shared/api-manager';
import {HttpClient} from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class CustomerexpenseService {

  constructor(private http: HttpClient) {
  }

  async delete(id: number): Promise<void>{
    return this.http.delete<void>(ApiManager.getURL(`customerexpenses/${id}`)).toPromise();
  }



}
