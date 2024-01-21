import {Injectable} from '@angular/core';
import {Creditapproval} from '../entities/creditapproval';
import {HttpClient} from '@angular/common/http';
import {ApiManager} from '../shared/api-manager';

@Injectable({
  providedIn: 'root'
})
export class CreditapprovalService {

  constructor(private http: HttpClient) { }

  async getAll(): Promise<Creditapproval[]>{
    const creditapprovals = await this.http.get<Creditapproval[]>(ApiManager.getURL('creditapprovals')).toPromise();
    return creditapprovals.map((creditapproval) => Object.assign(new Creditapproval(), creditapproval));
  }

}
