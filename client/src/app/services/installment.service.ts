import {Injectable} from '@angular/core';

import {ApiManager} from '../shared/api-manager';
import {HttpClient} from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class InstallmentService {

  constructor(private http: HttpClient) {
  }

  async delete(id: number): Promise<void>{
    return this.http.delete<void>(ApiManager.getURL(`installments/${id}`)).toPromise();
  }



}
